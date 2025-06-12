import { type DragEndEvent, type DragStartEvent } from "@dnd-kit/core";
import { useEffect, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import toast from "react-hot-toast";
import { useViewMode } from "../../context/view-mode";
import { useDeleteTaskMutation } from "../../graphql/mutations/delete-task/delete-task.graphql.generated";
import { useUpdateTaskMutation } from "../../graphql/mutations/update-task/update-task.graphql.generated";
import { useGetFilterTasksQuery } from "../../graphql/queries/filter-task.graphql.generated";
import { type Task } from "../../graphql/queries/get-task.graphql.generated";
import ErrorMessage from "../error-message/error-message";
import SkeletonKanbanBoard from "../skeleton-kanban-board/skeleton-kaban-board";
import TaskColumns from "../task-columns/task-columns";
import TaskFormModal from "../task-form-modal/task-form-modal";
import TaskListView from "../task-list-view/task-list-view";
import styles from "./tasks-view.module.css";
import type {
  FilterTaskInput,
  Status,
  UpdateTaskInput,
} from "../../types/graphql";

interface TasksViewProps {
  filters: FilterTaskInput;
}

export default function TasksView({ filters }: TasksViewProps) {
  const { viewMode } = useViewMode();

  const { data, loading, error, refetch } = useGetFilterTasksQuery({
    variables: { input: filters },
  });
  const [tasks, setTasks] = useState<Task[]>([]);
  const [updateTask] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();

  const [openModal, setOpenModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | undefined>(undefined);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  useEffect(() => {
    if (data?.tasks) {
      setTasks(data.tasks);
    }
  }, [data?.tasks]);

  const handleEdit = (task: Task) => {
    setSelectedTask(task);
    setOpenModal(true);
  };

  const handleSubmit = async (data: Omit<UpdateTaskInput, "id">) => {
    if (!selectedTask) return;
    try {
      await toast.promise(
        updateTask({
          variables: {
            input: {
              id: selectedTask.id,
              ...data,
            },
          },
        }),
        {
          loading: "Updating task...",
          success: "Task updated successfully!",
          error: "Failed to update task. Please try again.",
        },
      );
    } catch (err) {
      toast.error("Failed to update task. Please try again.");
      console.error("Error updating task", err);
    }
  };

  const handleDelete = (task: Task) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className={styles.dialog}>
            <h2 className={styles.title}>Confirm Deletion</h2>
            <p className={styles.message}>
              Are you sure you want to delete "{task.name}"?
            </p>
            <div className={styles.actions}>
              <button className={styles.cancel} onClick={onClose}>
                Cancel
              </button>
              <button
                className={styles.confirm}
                onClick={async () => {
                  onClose();
                  try {
                    await toast.promise(
                      deleteTask({
                        variables: {
                          input: { id: task.id },
                        },
                      }),
                      {
                        loading: "Deleting task...",
                        success: "Task deleted successfully!",
                        error: "Failed to delete task. Please try again.",
                      },
                    );
                    await refetch();
                  } catch (err) {
                    console.error("Error deleting task", err);
                  }
                }}
              >
                Delete
              </button>
            </div>
          </div>
        );
      },
    });
  };

  const handleDragStart = (event: DragStartEvent) => {
    const taskId = event.active.id as string;
    const found = tasks.find((t) => t.id === taskId);
    if (found) setActiveTask(found);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over || active.id === over.id) return;

    const taskId = active.id as string;
    const newStatus = over.id as Status;

    const taskToUpdate = tasks.find((t) => t.id === taskId);
    if (!taskToUpdate || taskToUpdate.status === newStatus) return;

    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task,
      ),
    );

    try {
      await updateTask({
        variables: {
          input: {
            id: taskId,
            status: newStatus,
          },
        },
        optimisticResponse: {
          updateTask: {
            __typename: "Task",
            ...taskToUpdate,
            status: newStatus,
          },
        },
      });
    } catch (err) {
      console.error("Error updating task on drag", err);
    }
  };

  if (loading) return <SkeletonKanbanBoard />;
  if (error) {
    return <ErrorMessage message={error.message || "Error loading tasks."} />;
  }

  return (
    <>
      {viewMode === 0 ? (
        <TaskColumns
          tasks={tasks}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          activeTask={activeTask}
        />
      ) : viewMode === 2 ? (
        <TaskListView tasks={tasks} />
      ) : (
        <p className={styles.emptyState}>
          No content available for this section yet
        </p>
      )}
      <div>
        <TaskFormModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          mode="edit"
          task={selectedTask}
          onSubmit={handleSubmit}
        />
      </div>
    </>
  );
}

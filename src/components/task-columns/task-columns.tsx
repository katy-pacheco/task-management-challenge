import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { useEffect, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import toast from "react-hot-toast";
import { useDeleteTaskMutation } from "../../graphql/mutations/delete-task/delete-task.graphql.generated";
import { useUpdateTaskMutation } from "../../graphql/mutations/update-task/update-task.graphql.generated";
import { useGetFilterTasksQuery } from "../../graphql/queries/filter-task.graphql.generated";
import { type Task } from "../../graphql/queries/get-task.graphql.generated";
import Draggable from "../draggable/draggable";
import { Droppable } from "../droppable/droppable";
import SkeletonKanbanBoard from "../skeleton-kanban-board/skeleton-kaban-board";
import TaskCard from "../task-card/task-card";
import TaskFormModal from "../task-form-modal/task-form-modal";
import TaskListView from "../task-list-view/task-list-view";
import styles from "./task-columns.module.css";
import type {
  FilterTaskInput,
  Status,
  UpdateTaskInput,
} from "../../types/graphql";

interface TaskColumnsProp {
  viewMode: number | null;
  filters: FilterTaskInput;
}

const status = [
  { label: "Backlog", value: "BACKLOG" },
  { label: "Todo", value: "TODO" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Completed", value: "DONE" },
  { label: "Cancelled", value: "CANCELLED" },
];

export default function TaskColumns({ viewMode, filters }: TaskColumnsProp) {
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

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

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
  if (error) return <p>Error :</p>;

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className={styles.taskList}>
        {viewMode === 1 ? (
          status.map((item, index) => {
            const filteredTasks = tasks.filter(
              (task) => task.status === item.value,
            );
            return (
              <Droppable id={item.value} key={index}>
                <div className={styles.taskListColumn}>
                  <h2 className={styles.taskListColumnStatus}>
                    {item.label} ({filteredTasks.length})
                  </h2>
                  {filteredTasks.length > 0 ? (
                    filteredTasks.map((task) => (
                      <div className={styles.taskCardWrapper} key={task.id}>
                        <Draggable id={task.id}>
                          <TaskCard
                            title={task.name}
                            pointEstimate={task.pointEstimate}
                            dueDate={task.dueDate}
                            taskTags={task.tags}
                            assignee={task.assignee ?? undefined}
                            onEdit={() => handleEdit(task)}
                            onDelete={() => handleDelete(task)}
                          />
                        </Draggable>
                      </div>
                    ))
                  ) : (
                    <p>No tasks in {item.label}</p>
                  )}
                </div>
              </Droppable>
            );
          })
        ) : (
          <TaskListView tasks={tasks} />
        )}

        <DragOverlay>
          {activeTask ? (
            <TaskCard
              title={activeTask.name}
              pointEstimate={activeTask.pointEstimate}
              dueDate={activeTask.dueDate}
              taskTags={activeTask.tags}
              onEdit={() => {}}
              onDelete={() => {}}
            />
          ) : null}
        </DragOverlay>

        <TaskFormModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          mode="edit"
          task={selectedTask}
          onSubmit={handleSubmit}
        />
      </div>
    </DndContext>
  );
}

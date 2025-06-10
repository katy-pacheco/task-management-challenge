import { useEffect, useState } from "react";
import {
  useGetTasksQuery,
  type Task,
} from "../../graphql/queries/get-task.graphql.generated";
import SkeletonKanbanBoard from "../skeleton-kanban-board/skeleton-kaban-board";
import TaskCard from "../task-card/task-card";
import styles from "./task-columns.module.css";
import TaskFormModal from "../task-form-modal/task-form-modal";
import { useUpdateTaskMutation } from "../../graphql/mutations/update-task/update-task.graphql.generated";
import { useDeleteTaskMutation } from "../../graphql/mutations/delete-task/delete-task.graphql.generated";
import type { Status, UpdateTaskInput } from "../../types/graphql";
import TaskListView from "../task-list-view/task-list-view";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import Draggable from "../draggable/draggable";
import { Droppable } from "../droppable/droppable";

interface TaskColumnsProp {
  viewMode: number | null;
}

const status = [
  { label: "Backlog", value: "BACKLOG" },
  { label: "Todo", value: "TODO" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Completed", value: "DONE" },
  { label: "Cancelled", value: "CANCELLED" },
];

export default function TaskColumns({ viewMode }: TaskColumnsProp) {
  const { data, loading, error, refetch } = useGetTasksQuery();
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
      await updateTask({
        variables: {
          input: {
            id: selectedTask.id,
            ...data,
          },
        },
      });
      setOpenModal(false);
    } catch (err) {
      console.error("Error updating task", err);
    }
  };

  const handleDelete = async (task: Task) => {
    try {
      await deleteTask({
        variables: {
          input: { id: task.id },
        },
      });
      await refetch();
    } catch (err) {
      console.error("Error deleting task", err);
    }
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

import { useState } from "react";
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
import type { UpdateTaskInput } from "../../types/graphql";
import TaskListView from "../task-list-view/task-list-view";

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
  const tasks: Task[] = data?.tasks ?? [];
  const [updateTask] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();

  const [openModal, setOpenModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | undefined>(undefined);

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

  if (loading) return <SkeletonKanbanBoard />;
  if (error) return <p>Error :</p>;

  return (
    <div className={styles.taskList}>
      {viewMode === 1 ? (
        status.map((item, index) => {
          const filteredTasks = tasks.filter(
            (task) => task.status === item.value,
          );
          return (
            <div className={styles.taskListColumn} key={index}>
              <h2 className={styles.taskListColumnStatus}>
                {item.label} ({filteredTasks.length})
              </h2>
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task) => (
                  <div className={styles.taskCardWrapper} key={task.id}>
                    <TaskCard
                      title={task.name}
                      pointEstimate={task.pointEstimate}
                      dueDate={task.dueDate}
                      taskTags={task.tags}
                      onEdit={() => handleEdit(task)}
                      onDelete={() => handleDelete(task)}
                    />
                  </div>
                ))
              ) : (
                <p>No tasks in {item.label}</p>
              )}
            </div>
          );
        })
      ) : (
        <TaskListView tasks={tasks} />
      )}

      <TaskFormModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        mode="edit"
        task={selectedTask}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

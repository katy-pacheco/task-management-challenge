import {
  useGetTasksQuery,
  type Task,
} from "../../graphql/queries/get-task.graphql.generated";
import SkeletonKanbanBoard from "../skeleton-kanban-board/skeleton-kaban-board";
import TaskCard from "../task-card/task-card";
import styles from "./task-columns.module.css";

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
  const { data, loading, error } = useGetTasksQuery();
  const tasks: Task[] = data?.tasks ?? [];

  if (loading) return <SkeletonKanbanBoard />;
  if (error) return <p>Error :</p>;

  return (
    <div className={styles.taskList}>
      {status.map((item, index) => {
        const filteredTasks = tasks.filter(
          (task) => task.status === item.value,
        );
        return (
          <div className={styles.taskListColumn} key={index}>
            <h2 className={styles.taskListColumnStatus}>
              {item.label} ({filteredTasks.length})
            </h2>
            {viewMode === 1 ? (
              <div>
                {filteredTasks.length > 0 ? (
                  filteredTasks.map((task) => (
                    <div className={styles.taskCardWrapper} key={task.id}>
                      <TaskCard
                        title={task.name}
                        pointEstimate={task.pointEstimate}
                        dueDate={task.dueDate}
                        taskTags={task.tags}
                      />
                    </div>
                  ))
                ) : (
                  <p>No tasks in {item.label}</p>
                )}
              </div>
            ) : (
              viewMode === 0 && <p>No tasks in {item.label}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}

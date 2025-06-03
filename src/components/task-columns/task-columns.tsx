import TaskCard from "../task-card/task-card";
import styles from "./task-columns.module.css";

interface TaskColumnsProp {
  viewMode: number | null;
}

const status = [
  { label: "Backlog" },
  { label: "Todo" },
  { label: "In Progress" },
  { label: "Completed" },
  { label: "Cancelled" },
];

export default function TaskColumns({ viewMode }: TaskColumnsProp) {
  return (
    <div className={styles.taskList}>
      {status.map((item, index) => (
        <div className={styles.taskListColumn} key={index}>
          <h2 className={styles.taskListColumnStatus}>{item.label} (02)</h2>
          {viewMode === 1 ? (
            <TaskCard
              title={"Twitter"}
              pointEstimate={"3"}
              dueDate={"Today"}
              taskTags={["IOS", "LABEL", "ANDROID", "RAILS", "REACT"]}
            />
          ) : (
            viewMode === 0 && <p>No tasks in {item.label}</p>
          )}
        </div>
      ))}
    </div>
  );
}

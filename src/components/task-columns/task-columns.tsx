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
          {viewMode === 1 && <p>No tasks in {item.label}</p>}
        </div>
      ))}
    </div>
  );
}

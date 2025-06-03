import { RiAddLine } from "@remixicon/react";
import { useState } from "react";
import SwitchButton from "../switch-button/switch-button";
import styles from "./main-content.module.css";

const status = [
  { label: "Backlog" },
  { label: "Todo" },
  { label: "In Progress" },
  { label: "Completed" },
  { label: "Cancelled" },
];

export default function MainContent() {
  const [viewMode, setViewMode] = useState<number | null>(1);

  return (
    <div className={styles.mainContent}>
      {/* Topbar */}
      <div role="toolbar" aria-label="Top bar" className={styles.topBar}>
        <SwitchButton selectedItem={viewMode} onChange={setViewMode} />
        <button
          type="button"
          aria-label="Add task"
          className={styles.topBarButtonAdd}
        >
          <RiAddLine />
        </button>
      </div>
      {/* Tasks columns */}
      <div className={styles.taskList}>
        {status.map((item, index) => (
          <div className={styles.taskListColumn} key={index}>
            <h2 className={styles.taskListColumnStatus}>{item.label} (02)</h2>
            {viewMode === 1 && <p>No tasks in {item.label}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

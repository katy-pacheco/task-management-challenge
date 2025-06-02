import { RiAddLine, RiGalleryView2, RiMenuLine } from "@remixicon/react";
import { useState } from "react";
import styles from "./main-content.module.css";

const status = [
  { label: "Backlog" },
  { label: "Todo" },
  { label: "In Progress" },
  { label: "Completed" },
  { label: "Cancelled" },
];

export default function MainContent() {
  const [selectedItem, setSelectedItem] = useState<number | null>(1);

  return (
    <div className={styles.mainContent}>
      {/* Topbar */}
      <div role="toolbar" aria-label="Top bar" className={styles.topBar}>
        <div className={styles.topBarViews}>
          <button
            type="button"
            aria-label="tree view"
            onClick={() => setSelectedItem(0)}
            className={`${styles.topBarButton} ${selectedItem === 0 ? styles.selected : ""}`}
          >
            <RiMenuLine />
          </button>
          <button
            type="button"
            aria-label="dashboard view"
            onClick={() => setSelectedItem(1)}
            className={`${styles.topBarButton} ${selectedItem === 1 ? styles.selected : ""}`}
          >
            <RiGalleryView2 />
          </button>
        </div>
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
            {selectedItem === 1 && <p>No tasks in {item.label}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

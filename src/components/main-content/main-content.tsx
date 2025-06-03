import { RiAddLine } from "@remixicon/react";
import { useState } from "react";
import SwitchButton from "../switch-button/switch-button";
import TaskColumns from "../task-columns/task-columns";
import styles from "./main-content.module.css";

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
      <TaskColumns viewMode={viewMode} />
    </div>
  );
}

import { RiAddLine, RiGalleryView2, RiMenuLine } from "@remixicon/react";
import { useState } from "react";
import styles from "./main-content.module.css";

export default function MainContent() {
  const [selectedItem, setSelectedItem] = useState<number | null>(1);

  return (
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
  );
}

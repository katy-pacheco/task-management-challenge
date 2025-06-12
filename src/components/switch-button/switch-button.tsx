import { RiGalleryView2, RiMenuLine } from "@remixicon/react";
import { useViewMode } from "../../context/view-mode";
import styles from "./switch-button.module.css";

export default function SwitchButton() {
  const { viewMode, setViewMode } = useViewMode();

  return (
    <div className={styles.topBarViews}>
      <button
        type="button"
        aria-label="tree view"
        onClick={() => setViewMode(2)}
        className={`${styles.topBarButton} ${viewMode === 2 ? styles.selected : ""}`}
      >
        <RiMenuLine />
      </button>
      <button
        type="button"
        aria-label="dashboard view"
        onClick={() => setViewMode(0)}
        className={`${styles.topBarButton} ${viewMode === 0 ? styles.selected : ""}`}
      >
        <RiGalleryView2 />
      </button>
    </div>
  );
}

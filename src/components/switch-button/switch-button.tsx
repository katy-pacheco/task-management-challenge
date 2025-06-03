import { RiGalleryView2, RiMenuLine } from "@remixicon/react";
import styles from "./switch-button.module.css";

type SwitchButtonProps = {
  selectedItem: number | null;
  // eslint-disable-next-line no-unused-vars
  onChange: (_: number) => void;
};

export default function SwitchButton({
  selectedItem,
  onChange,
}: SwitchButtonProps) {
  return (
    <div className={styles.topBarViews}>
      <button
        type="button"
        aria-label="tree view"
        onClick={() => onChange(0)}
        className={`${styles.topBarButton} ${selectedItem === 0 ? styles.selected : ""}`}
      >
        <RiMenuLine />
      </button>
      <button
        type="button"
        aria-label="dashboard view"
        onClick={() => onChange(1)}
        className={`${styles.topBarButton} ${selectedItem === 1 ? styles.selected : ""}`}
      >
        <RiGalleryView2 />
      </button>
    </div>
  );
}

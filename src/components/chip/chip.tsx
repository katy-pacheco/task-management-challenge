import { RiAlarmLine } from "@remixicon/react";
import styles from "./chip.module.css";

interface ChipProps {
  label: string;
  icon?: "none" | "icon";
  variant: "solid" | "outline";
  color?: "default" | "success" | "info" | "warning" | "error";
}

export default function Chip({
  label,
  icon = "none",
  variant,
  color = "default",
}: ChipProps) {
  const hasIcon = icon === "icon";
  const variantColorClass = styles[`${variant}-${color}`];

  return (
    <span className={`${styles.chip} ${variantColorClass}`}>
      {hasIcon && <RiAlarmLine className={styles.chipIcon} />}
      {label}
    </span>
  );
}

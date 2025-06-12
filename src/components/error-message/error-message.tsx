import { RiErrorWarningFill } from "@remixicon/react";
import styles from "./error-message.module.css";

interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className={styles.error}>
      <RiErrorWarningFill />
      <p>{message}</p>
    </div>
  );
}

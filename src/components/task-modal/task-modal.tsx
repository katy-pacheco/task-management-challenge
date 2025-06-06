import { type ReactNode, createContext } from "react";
import { createPortal } from "react-dom";
import styles from "./task-modal.module.css";

interface ModalContextType {
  onClose: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalRoot({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}) {
  if (!open) return null;
  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <ModalContext.Provider value={{ onClose }}>
          {children}
        </ModalContext.Provider>
      </div>
    </div>,
    document.body,
  );
}
export function ModalHeader({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}

export function ModalBody({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}

export function ModalFooter({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}

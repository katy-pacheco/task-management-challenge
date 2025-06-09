import { RiAddLine } from "@remixicon/react";
import { useState } from "react";
import SwitchButton from "../switch-button/switch-button";
import TaskColumns from "../task-columns/task-columns";
import TaskFormModal from "../task-form-modal/task-form-modal";
import styles from "./main-content.module.css";
import { useCreateTaskMutation } from "../../graphql/mutations/create-task/create-task.graphql.generated";
import type { CreateTaskInput, UpdateTaskInput } from "../../types/graphql";

export default function MainContent() {
  const [viewMode, setViewMode] = useState<number | null>(1);
  const [openModal, setOpenModal] = useState(false);
  const [createTask] = useCreateTaskMutation();

  const handleSubmit = async (data: CreateTaskInput | UpdateTaskInput) => {
    try {
      // If the data contains an id, it means it's an update operation
      if ("id" in data) {
        return;
      }
      await createTask({
        variables: {
          input: {
            ...data,
          },
        },
      });
      console.log("Task created!");
    } catch (err) {
      console.error("Error creating task", err);
    }
  };

  return (
    <div className={styles.mainContent}>
      {/* Topbar */}
      <div role="toolbar" aria-label="Top bar" className={styles.topBar}>
        <SwitchButton selectedItem={viewMode} onChange={setViewMode} />
        <button
          type="button"
          aria-label="Add task"
          className={styles.topBarButtonAdd}
          onClick={() => setOpenModal(true)}
        >
          <RiAddLine />
        </button>
      </div>
      {/* Tasks columns */}
      <TaskColumns viewMode={viewMode} />

      <TaskFormModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        mode="create"
        onSubmit={handleSubmit}
      />
    </div>
  );
}

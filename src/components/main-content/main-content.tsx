import { RiAddLine } from "@remixicon/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useCreateTaskMutation } from "../../graphql/mutations/create-task/create-task.graphql.generated";
import { GET_FILTER_TASKS } from "../../graphql/queries/filter-task.graphql";
import { useGetProfileQuery } from "../../graphql/queries/get-profile.graphql.generated";
import SearchBar from "../search-bar/search-bar";
import SwitchButton from "../switch-button/switch-button";
import TaskColumns from "../task-columns/task-columns";
import TaskFormModal from "../task-form-modal/task-form-modal";
import styles from "./main-content.module.css";
import type {
  CreateTaskInput,
  UpdateTaskInput,
  FilterTaskInput,
} from "../../types/graphql";

export default function MainContent() {
  const [viewMode, setViewMode] = useState<number | null>(1);
  const [openModal, setOpenModal] = useState(false);
  const [createTask] = useCreateTaskMutation();
  const { data: profileData } = useGetProfileQuery();
  const currentUser = profileData?.profile;
  const [filters, setFilters] = useState<FilterTaskInput>({});

  const handleApplyFilters = (filters: FilterTaskInput) => {
    setFilters(filters);
  };

  const handleSubmit = async (data: CreateTaskInput | UpdateTaskInput) => {
    try {
      // If the data contains an id, it means it's an update operation
      if ("id" in data) {
        return;
      }
      await toast.promise(
        createTask({
          variables: {
            input: data,
          },
          refetchQueries: [
            {
              query: GET_FILTER_TASKS,
              variables: { input: {} },
            },
          ],
        }),
        {
          loading: "Creating task...",
          success: "Task created successfully!",
          error: "Failed to create task. Please try again.",
        },
      );
    } catch (err) {
      toast.error("Failed to create task. Please try again.");
      console.error("Error creating task", err);
    }
  };

  return (
    <>
      <SearchBar user={currentUser} onApplyFilters={handleApplyFilters} />
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
        <TaskColumns viewMode={viewMode} filters={filters} />

        <TaskFormModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          mode="create"
          onSubmit={handleSubmit}
        />
      </div>
    </>
  );
}

import { useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  PointEstimate,
  Status,
  TaskTag,
  type CreateTaskInput,
  type Task,
  type UpdateTaskInput,
} from "../../types/graphql";
import {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalRoot,
} from "../task-modal/task-modal";
import PointEstimateDropdown from "../point-estimate/point-estimate-dropdown";
import AssignToDropdown from "../assign-to-dropdown/assign-to-dropdown";
import LabelTags from "../label-tags/label-tags";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./task-form-modal.module.css";
import { RiCalendarCheckLine } from "@remixicon/react";

interface TaskFormModalFormData {
  id?: string;
  name: string;
  dueDate?: string;
  pointEstimate: PointEstimate;
  status: Status;
  tags: TaskTag[];
  assigneeId?: string;
}

interface TaskFormProps {
  open: boolean;
  onClose: () => void;
  mode: "create" | "edit";
  task?: Task;
  onSubmit: (data: CreateTaskInput | Omit<UpdateTaskInput, "id">) => void;
}

export default function TaskFormModal({
  open,
  onClose,
  mode,
  task,
  onSubmit,
}: TaskFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors },
  } = useForm<TaskFormModalFormData>({
    defaultValues: {
      name: "",
      dueDate: "",
      pointEstimate: PointEstimate.Zero,
      status: Status.Backlog,
      tags: [],
      assigneeId: "",
    },
  });

  const datePickerRef = useRef<DatePicker | null>(null);
  const dueDateValue = watch("dueDate");

  useEffect(() => {
    if (mode === "edit" && task) {
      // When in edit mode and a task is provided, populate the form
      reset({
        id: task.id,
        name: task.name,
        dueDate: task.dueDate
          ? new Date(task.dueDate).toISOString().split("T")[0]
          : undefined,
        pointEstimate: task.pointEstimate,
        status: task.status,
        tags: task.tags,
        assigneeId: task.assignee?.id || undefined,
      });
    } else {
      reset({
        id: undefined,
        name: "",
        dueDate: undefined,
        pointEstimate: PointEstimate.Zero,
        status: Status.Backlog,
        tags: [],
        assigneeId: undefined,
      });
    }
  }, [mode, task, reset]);

  const handleFormSubmit = (data: TaskFormModalFormData) => {
    if (mode === "edit" && data.id) {
      const updateInput: UpdateTaskInput = {
        id: data.id,
        name: data.name,
        dueDate: data.dueDate,
        pointEstimate: data.pointEstimate,
        status: data.status,
        tags: data.tags,
        assigneeId: data.assigneeId,
      };
      onSubmit(updateInput);
    } else {
      const createInput: CreateTaskInput = {
        name: data.name,
        dueDate: data.dueDate,
        pointEstimate: data.pointEstimate,
        status: data.status,
        tags: data.tags,
        assigneeId: data.assigneeId,
      };
      onSubmit(createInput);
    }
    onClose();
    reset();
  };

  const openDatePicker = () => {
    datePickerRef.current?.setOpen(true);
  };

  return (
    <ModalRoot open={open} onClose={onClose}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <ModalHeader>
          <input
            type="text"
            placeholder="Task title"
            {...register("name", { required: true })}
            className={styles.taskName}
          />
          {errors.name && <span>Title is required</span>}
        </ModalHeader>

        <ModalBody>
          <div className={styles.formFields}>
            {/* PointEstimate */}
            <Controller
              name="pointEstimate"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <PointEstimateDropdown
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />

            {/* Assignee */}
            <Controller
              name="assigneeId"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <AssignToDropdown
                  value={field.value ?? ""}
                  onChange={field.onChange}
                />
              )}
            />

            {/* Tags */}
            <Controller
              name="tags"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <LabelTags value={field.value} onChange={field.onChange} />
              )}
            />

            {/* Due Date */}
            <div className={styles.datePickerContainer}>
              <button
                type="button"
                onClick={openDatePicker}
                className={styles.datePickerButton}
              >
                <RiCalendarCheckLine />
                <span className={styles.buttonText}>
                  {dueDateValue
                    ? new Date(dueDateValue).toLocaleDateString()
                    : "Due Date"}
                </span>
              </button>

              <Controller
                name="dueDate"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <DatePicker
                    ref={datePickerRef}
                    onChange={(date: Date | null) => field.onChange(date)}
                    selected={field.value ? new Date(field.value) : null}
                    dateFormat="MM/dd/yyyy"
                    className={styles.datePickerInput}
                  />
                )}
              />
              {errors.dueDate && <span>Due date is required</span>}
            </div>
          </div>
        </ModalBody>

        <ModalFooter>
          <div>
            <button
              type="button"
              onClick={() => {
                onClose();
                reset();
              }}
            >
              Cancel
            </button>
            <button type="submit">
              {mode === "create" ? "Save" : "Update"}
            </button>
          </div>
        </ModalFooter>
      </form>
    </ModalRoot>
  );
}

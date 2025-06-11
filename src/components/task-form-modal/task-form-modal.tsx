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
import {
  RiArrowLeftDoubleLine,
  RiArrowLeftSLine,
  RiArrowRightDoubleLine,
  RiArrowRightSLine,
  RiCalendarCheckLine,
} from "@remixicon/react";
import { format } from "date-fns";
import { taskFormSchema } from "../../validation/task-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface TaskFormModalFormData {
  id?: string;
  name: string;
  dueDate: string;
  pointEstimate: PointEstimate;
  status: Status;
  tags: TaskTag[];
  assigneeId: string;
}

interface TaskFormProps {
  open: boolean;
  onClose: () => void;
  mode: "create" | "edit";
  task?: Task;
  onSubmit: (data: CreateTaskInput | UpdateTaskInput) => void;
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
    resolver: zodResolver(taskFormSchema),
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
        dueDate: task.dueDate,
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
        pointEstimate: undefined,
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

  const handleClose = () => {
    onClose();
    reset();
  };

  const openDatePicker = () => {
    datePickerRef.current?.setOpen(true);
  };

  return (
    <ModalRoot open={open} onClose={handleClose}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <ModalHeader>
          <input
            type="text"
            placeholder="Task title"
            {...register("name")}
            className={styles.taskName}
          />
          {errors.name && <span>{errors.name.message as string}</span>}
        </ModalHeader>

        <ModalBody>
          <div className={styles.formFields}>
            {/* PointEstimate */}
            <Controller
              name="pointEstimate"
              control={control}
              render={({ field }) => (
                <PointEstimateDropdown
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            {errors.pointEstimate && (
              <span>{errors.pointEstimate.message as string}</span>
            )}

            {/* Assignee */}
            <Controller
              name="assigneeId"
              control={control}
              render={({ field }) => (
                <AssignToDropdown
                  value={field.value ?? ""}
                  onChange={field.onChange}
                />
              )}
            />
            {errors.assigneeId && (
              <span>{errors.assigneeId.message as string}</span>
            )}

            {/* Tags */}
            <Controller
              name="tags"
              control={control}
              render={({ field }) => (
                <LabelTags value={field.value} onChange={field.onChange} />
              )}
            />
            {errors.tags && <span>{errors.tags.message as string}</span>}

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
                    ? format(new Date(dueDateValue), "MMM.dd yyyy")
                    : "Due Date"}
                </span>
              </button>

              <Controller
                name="dueDate"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    ref={datePickerRef}
                    onChange={(date: Date | null) =>
                      field.onChange(date ? date.toISOString() : "")
                    }
                    selected={field.value ? new Date(field.value) : null}
                    dateFormat="MM/dd/yyyy"
                    className={styles.datePickerInput}
                    todayButton="Today"
                    minDate={new Date()}
                    renderCustomHeader={({
                      monthDate,
                      decreaseMonth,
                      increaseMonth,
                      decreaseYear,
                      increaseYear,
                      prevMonthButtonDisabled,
                      nextMonthButtonDisabled,
                      prevYearButtonDisabled,
                      nextYearButtonDisabled,
                    }) => (
                      <div className={styles.arrowContainer}>
                        <div>
                          <button
                            type="button"
                            onClick={decreaseYear}
                            disabled={prevYearButtonDisabled}
                          >
                            {<RiArrowLeftDoubleLine />}
                          </button>
                          <button
                            type="button"
                            onClick={decreaseMonth}
                            disabled={prevMonthButtonDisabled}
                            style={{ marginRight: "10px" }}
                          >
                            {<RiArrowLeftSLine />}
                          </button>
                        </div>
                        <span style={{ fontSize: "1.2em", fontWeight: "bold" }}>
                          {format(monthDate, "MMMM yyyy")}
                        </span>
                        <div>
                          <button
                            type="button"
                            onClick={increaseMonth}
                            disabled={nextMonthButtonDisabled}
                            style={{ marginLeft: "10px" }}
                          >
                            {<RiArrowRightSLine />}
                          </button>
                          <button
                            type="button"
                            onClick={increaseYear}
                            disabled={nextYearButtonDisabled}
                            style={{ marginLeft: "10px" }}
                          >
                            {<RiArrowRightDoubleLine />}
                          </button>
                        </div>
                      </div>
                    )}
                  />
                )}
              />
              {errors.dueDate && (
                <span>{errors.dueDate.message as string}</span>
              )}
            </div>
          </div>
        </ModalBody>

        <ModalFooter>
          <div className={styles.wrapperButton}>
            <button
              type="button"
              onClick={handleClose}
              className={styles.cancelButton}
            >
              Cancel
            </button>
            <button type="submit" className={styles.submitButton}>
              {mode === "create" ? "Create" : "Update"}
            </button>
          </div>
        </ModalFooter>
      </form>
    </ModalRoot>
  );
}

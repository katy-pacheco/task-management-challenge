import { RiArrowDownSLine, RiArrowRightSLine } from "@remixicon/react";
import { useState } from "react";
import { formatDueDate } from "../../utils/format-date";
import { getPointEstimateNumeric } from "../../utils/get-point-estimate-numeric";
import { getTaskTagLabel } from "../../utils/get-task-tag-label";
import styles from "./task-list-view.module.css";
import type { Task } from "../../types/graphql";

interface TaskListProp {
  tasks: Task[];
}

const statusOrder = [
  { label: "To Do", value: "TODO" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Backlog", value: "BACKLOG" },
  { label: "Completed", value: "DONE" },
  { label: "Cancelled", value: "CANCELLED" },
];

export default function TaskListView({ tasks }: TaskListProp) {
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    TODO: true,
    IN_PROGRESS: true,
    BACKLOG: false,
    DONE: false,
    CANCELLED: false,
  });

  const toggleSection = (status: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [status]: !prev[status],
    }));
  };

  const getInitials = (fullName: string) => {
    return fullName
      .split(" ")
      .map((name) => name.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getDueDateClass = (dateString: string) => {
    const formatted = formatDueDate(dateString);
    if (formatted === "Yesterday") return styles.dueDateOverdue;
    if (formatted === "Today") return styles.dueDateToday;
    return styles.dueDateNormal;
  };

  return (
    <div className={styles.listView}>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead className={styles.tableHeader}>
            <tr className={styles.tableHeaderRow}>
              <th className={styles.tableHeaderCell}># Task Name</th>
              <th className={styles.tableHeaderCell}>Task Tags</th>
              <th className={styles.tableHeaderCell}>Estimate</th>
              <th className={styles.tableHeaderCell}>Task Assign Name</th>
              <th className={styles.tableHeaderCell}>Due Date</th>
            </tr>
          </thead>
          <tbody className={styles.tableBody}>
            {statusOrder.map((status) => {
              const groupTasks = tasks.filter((t) => t.status === status.value);
              if (groupTasks.length === 0) return null;

              const isExpanded = expandedSections[status.value];

              return (
                <>
                  <tr
                    className={styles.sectionRow}
                    key={status.value + "-section"}
                  >
                    <td className={styles.sectionCell} colSpan={5}>
                      <button
                        onClick={() => toggleSection(status.value)}
                        className={styles.sectionButton}
                      >
                        {isExpanded ? (
                          <RiArrowRightSLine />
                        ) : (
                          <RiArrowDownSLine />
                        )}
                        {status.label} (
                        {groupTasks.length.toString().padStart(2, "0")})
                      </button>
                    </td>
                  </tr>
                  {isExpanded &&
                    groupTasks.map((task, idx) => (
                      <tr key={task.id} className={styles.taskRow}>
                        <td className={styles.taskCell}>
                          <span className={styles.taskNumber}>
                            {(idx + 1).toString().padStart(2, "0")}
                          </span>
                          <span className={styles.taskName}>{task.name}</span>
                        </td>
                        <td className={styles.taskCell}>
                          <div className={styles.tagsContainer}>
                            {task.tags?.slice(0, 1).map((tag) => (
                              <span key={tag} className={styles.tag}>
                                {getTaskTagLabel(tag)}
                              </span>
                            ))}
                            {task.tags && task.tags.length > 1 && (
                              <span className={styles.tagMore}>
                                +{task.tags.length - 1}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className={styles.taskCell}>
                          <span className={styles.estimate}>
                            {getPointEstimateNumeric(task.pointEstimate)} Points
                          </span>
                        </td>
                        <td className={styles.taskCell}>
                          {task.assignee ? (
                            <div className={styles.assigneeContainer}>
                              <div className={styles.assigneeAvatar}>
                                {getInitials(task.assignee.fullName)}
                              </div>
                              <span className={styles.assigneeName}>
                                {task.assignee.fullName}
                              </span>
                            </div>
                          ) : (
                            <span className={styles.noAssignee}>-</span>
                          )}
                        </td>
                        <td className={styles.taskCell}>
                          <span
                            className={`${styles.dueDate} ${
                              task.dueDate
                                ? getDueDateClass(task.dueDate)
                                : styles.dueDateNormal
                            }`}
                          >
                            {task.dueDate ? formatDueDate(task.dueDate) : "-"}
                          </span>
                        </td>
                      </tr>
                    ))}
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

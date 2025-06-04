import {
  RiAttachment2,
  RiChat3Line,
  RiMoreLine,
  RiNodeTree,
} from "@remixicon/react";
import { formatDueDate } from "../../utils/format-date";
import { getColorTask } from "../../utils/get-color-task";
import Avatar from "../avatar/avatar";
import Chip from "../chip/chip";
import styles from "./task-card.module.css";
import type { PointEstimate } from "../../types/graphql";

const pointEstimateMap: Record<PointEstimate, string> = {
  ZERO: "0",
  ONE: "1",
  TWO: "2",
  FOUR: "4",
  EIGHT: "8",
};

interface TaskProps {
  title: string;
  pointEstimate: PointEstimate;
  dueDate: string;
  taskTags: string[];
}

export default function TaskCard({
  title,
  pointEstimate,
  dueDate,
  taskTags,
}: TaskProps) {
  return (
    <div className={styles.card}>
      <div className={styles.cardTitle}>
        <h3>{title}</h3>
        <RiMoreLine />
      </div>
      <div className={styles.cardDetails}>
        <p>{pointEstimateMap[pointEstimate]} Pts</p>
        <Chip
          label={formatDueDate(dueDate)}
          variant={"solid"}
          icon="icon"
          color="default"
        />
      </div>
      <div className={styles.cardTags}>
        {taskTags &&
          taskTags.map((task, index) => (
            <Chip
              key={index}
              label={task}
              variant={"solid"}
              color={getColorTask(task)}
            />
          ))}
      </div>
      <div className={styles.cardFooter}>
        <Avatar size="small" />
        <div className={styles.cardFooterIcons}>
          <RiAttachment2 />
          <span>
            5
            <RiNodeTree />
          </span>
          <span>
            3
            <RiChat3Line />
          </span>
        </div>
      </div>
    </div>
  );
}

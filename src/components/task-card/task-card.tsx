import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  RiAttachment2,
  RiChat3Line,
  RiDeleteBin6Line,
  RiMoreLine,
  RiNodeTree,
  RiPencilLine,
} from "@remixicon/react";
import { formatDueDate } from "../../utils/format-date";
import { getColorTask } from "../../utils/get-color-task";
import { getTaskTagLabel } from "../../utils/get-task-tag-label";
import Avatar from "../avatar/avatar";
import Chip from "../chip/chip";
import styles from "./task-card.module.css";
import type { PointEstimate, TaskTag, User } from "../../types/graphql";

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
  taskTags: TaskTag[];
  assignee?: User;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function TaskCard({
  title,
  pointEstimate,
  dueDate,
  taskTags,
  assignee,
  onEdit,
  onDelete,
}: TaskProps) {
  const handleMenuInteraction = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const handleMenuItemClick = (action?: () => void) => {
    action?.();
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardTitle}>
        <h3>{title}</h3>
        <Menu as="div" className={styles.menuContainer}>
          <MenuButton
            as="div"
            className={styles.moreButton}
            onMouseDown={handleMenuInteraction}
            onTouchStart={handleMenuInteraction}
            onClick={handleMenuInteraction}
            style={{ touchAction: "none" }}
          >
            <RiMoreLine size={"24"} />
          </MenuButton>
          <MenuItems className={styles.menuItems}>
            <MenuItem>
              <button
                onClick={() => handleMenuItemClick(onEdit)}
                onMouseDown={handleMenuInteraction}
                className={styles.menuItem}
              >
                <RiPencilLine />
                Edit
              </button>
            </MenuItem>
            <MenuItem>
              <button
                onMouseDown={(e) => e.stopPropagation()}
                onTouchStart={(e) => e.stopPropagation()}
                style={{ touchAction: "none" }}
                onClick={() => handleMenuItemClick(onDelete)}
                className={`${styles.menuItem} `}
              >
                <RiDeleteBin6Line />
                Delete
              </button>
            </MenuItem>
          </MenuItems>
        </Menu>
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
              label={getTaskTagLabel(task)}
              variant={"solid"}
              color={getColorTask(task)}
            />
          ))}
      </div>
      <div className={styles.cardFooter}>
        <Avatar size="small" user={assignee} />
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

import {
  RiBriefcase4Line,
  RiCalendarEventFill,
  RiGalleryView2,
  RiMenuLine,
  RiPieChartLine,
  RiSettings4Line,
  RiTimeLine,
} from "@remixicon/react";
import logo from "../../assets/Vector.svg";
import { useViewMode } from "../../context/view-mode";
import styles from "./sidebar.module.css";

const navItems = [
  { label: "DASHBOARD", icon: <RiGalleryView2 className={styles.navIcon} /> },
  { label: "PROJECTS", icon: <RiBriefcase4Line className={styles.navIcon} /> },
  { label: "MY TASK", icon: <RiMenuLine className={styles.navIcon} /> },
  {
    label: "CALENDAR",
    icon: <RiCalendarEventFill className={styles.navIcon} />,
  },
  { label: "TIME MANAGE", icon: <RiTimeLine className={styles.navIcon} /> },
  { label: "REPORTS", icon: <RiPieChartLine className={styles.navIcon} /> },
  { label: "SETTINGS", icon: <RiSettings4Line className={styles.navIcon} /> },
];

export default function Sidebar() {
  const { viewMode, setViewMode } = useViewMode();

  return (
    <nav className={styles.sidebar}>
      <div className={styles.sidebarLogo}>
        <img src={logo} alt="Ravn logo" />
      </div>
      <ul className={styles.sidebarNav}>
        {navItems.map((item, index) => (
          <li
            key={index}
            onClick={() => setViewMode(index)}
            className={`${styles.sidebarNavItem} ${index === viewMode ? styles.selected : ""}`}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") setViewMode(index);
            }}
          >
            {item.icon}
            <p>{item.label}</p>
          </li>
        ))}
      </ul>
    </nav>
  );
}

import { faker } from "@faker-js/faker";
import styles from "./avatar.module.css";

interface AvatarProps {
  size: "small" | "medium" | "large";
}

const avatar = faker.image.avatar();

export default function Avatar({ size }: AvatarProps) {
  return (
    <img
      src={avatar}
      alt="Profile avatar"
      className={`${styles.avatar} ${styles[size]}`}
    />
  );
}

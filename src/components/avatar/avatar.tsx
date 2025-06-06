import { faker } from "@faker-js/faker";
import { useState } from "react";
import styles from "./avatar.module.css";

interface AvatarProps {
  size: "small" | "medium" | "large";
}

export default function Avatar({ size }: AvatarProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const avatar = faker.image.avatar();

  return (
    <div className={styles.avatarContainer}>
      {loading && (
        <div
          className={`${styles.avatar} ${styles.avatarSkeleton} ${styles[size]}`}
        ></div>
      )}
      <img
        src={avatar}
        alt="Profile avatar"
        className={`${styles.avatar} ${styles[size]}`}
        style={{ display: loading ? "none" : "block" }}
        onLoad={() => setLoading(false)}
      />
    </div>
  );
}

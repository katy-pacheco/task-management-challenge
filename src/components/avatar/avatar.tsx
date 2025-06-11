import { useState } from "react";
import styles from "./avatar.module.css";
import type { User } from "../../types/graphql";

interface AvatarProps {
  size: "small" | "medium" | "large";
  user?: User;
  onClick?: () => void;
}

export default function Avatar({ size, user, onClick }: AvatarProps) {
  const [loading, setLoading] = useState<boolean>(true);

  const getValidAvatar = (user?: User) => {
    if (!user) {
      // Provide a generic fallback if user is undefined
      return `https://api.dicebear.com/7.x/pixel-art/svg?seed=unknown`;
    }
    const fallback = `https://api.dicebear.com/7.x/pixel-art/svg?seed=${encodeURIComponent(user.fullName)}`;

    if (!user.avatar || user.avatar.includes("dicebear.com/api/initials")) {
      // It's an old or broken DiceBear URL
      return fallback;
    }

    return user.avatar;
  };

  return (
    <div className={styles.avatarContainer}>
      {loading && (
        <div
          className={`${styles.avatar} ${styles.avatarSkeleton} ${styles[size]}`}
        ></div>
      )}
      <img
        src={getValidAvatar(user) ?? undefined}
        alt="Profile avatar"
        className={`${styles.avatar} ${styles[size]}`}
        style={{ display: loading ? "none" : "block" }}
        onLoad={() => setLoading(false)}
        onClick={onClick}
      />
    </div>
  );
}

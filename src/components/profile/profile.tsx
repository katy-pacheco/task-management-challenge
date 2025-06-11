import { RiCloseLine } from "@remixicon/react";
import { useGetProfileQuery } from "../../graphql/queries/get-profile.graphql.generated";
import Avatar from "../avatar/avatar";
import styles from "./profile.module.css";

interface ProfileProps {
  onClose: () => void;
}

export default function Profile({ onClose }: ProfileProps) {
  const { data, loading, error } = useGetProfileQuery();
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;
  return (
    <div className={styles.profileContainer}>
      <button onClick={onClose}>
        <RiCloseLine />
      </button>
      {data && data.profile && (
        <div>
          <Avatar size="large" user={data.profile} onClick={onClose} />
          <h2>{data.profile.fullName}</h2>
          <p>Email: {data.profile.email}</p>
          <p>Type: {data.profile.type}</p>
        </div>
      )}
    </div>
  );
}

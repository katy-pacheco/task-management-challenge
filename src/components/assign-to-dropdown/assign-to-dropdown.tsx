import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { RiUser3Fill } from "@remixicon/react";
import { useGetUsersQuery } from "../../graphql/queries/get-users.graphql.generated";
import styles from "./assign-to-dropdown.module.css";
import type { User } from "../../types/graphql";

interface AssignToDropdownProps {
  value?: string; // assigneeId
  onChange: (assigneeId: string) => void;
}

export default function AssignToDropdown({
  value,
  onChange,
}: AssignToDropdownProps) {
  const { data, loading, error } = useGetUsersQuery();
  const selectedPerson = data?.users.find((user) => user.id === value);

  const getValidAvatar = (user: User) => {
    const fallback = `https://api.dicebear.com/7.x/pixel-art/svg?seed=${encodeURIComponent(user.fullName)}`;

    if (!user.avatar || user.avatar.includes("dicebear.com/api/initials")) {
      // It's an old or broken DiceBear URL
      return fallback;
    }

    return user.avatar;
  };

  function handleUserChange(user: User | null) {
    if (user) {
      onChange(user.id);
    }
  }

  if (loading || !data?.users) return null;
  if (error) return <p>Error loading users</p>;

  return (
    <div className={styles.wrapper}>
      <Listbox value={selectedPerson ?? null} onChange={handleUserChange}>
        <ListboxButton className={styles.assigneeButton}>
          {selectedPerson ? (
            <>
              <img
                src={getValidAvatar(selectedPerson)}
                alt={selectedPerson.fullName}
                className={styles.buttonAvatar}
              />
              <span className={styles.assigneeFullName}>
                {selectedPerson.fullName}
              </span>
            </>
          ) : (
            <>
              <RiUser3Fill />
              <span className={styles.assigneeButtonTitle}>Assignee</span>
            </>
          )}
        </ListboxButton>
        <ListboxOptions className={styles.optionsList}>
          <div className={styles.dropdownTitle}>Assign To...</div>
          {data?.users.map((person) => (
            <ListboxOption
              key={person.id}
              value={person}
              className={({ focus, selected }) =>
                `${styles.option} ${focus ? styles.activeOption : ""} ${selected ? styles.selectedOption : ""}`
              }
            >
              <div className={styles.personInfo}>
                <img
                  src={getValidAvatar(person)}
                  alt={person.fullName}
                  className={styles.avatar}
                />
                <span className={styles.personName}>{person.fullName}</span>
              </div>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </div>
  );
}

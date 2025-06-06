import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import styles from "./assign-to-dropdown.module.css";
import { RiUser3Fill } from "@remixicon/react";
import { useState } from "react";
import type { User } from "../../types/graphql";
import { useGetUsersQuery } from "../../graphql/queries/get-users.graphql.generated";

export default function AssignToDropdown() {
  const [selectedPerson, setSelectedPerson] = useState<User | null>(null);

  const { data, loading, error } = useGetUsersQuery();

  const getValidAvatar = (user: User) => {
    const fallback = `https://api.dicebear.com/7.x/pixel-art/svg?seed=${encodeURIComponent(user.fullName)}`;

    if (!user.avatar || user.avatar.includes("dicebear.com/api/initials")) {
      // It's an old or broken DiceBear URL
      return fallback;
    }

    return user.avatar;
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading users</p>;

  return (
    <div className={styles.wrapper}>
      <Listbox value={selectedPerson} onChange={setSelectedPerson}>
        <ListboxButton className={styles.assigneeButton}>
          {selectedPerson ? (
            <>
              <img
                src={getValidAvatar(selectedPerson)}
                alt={selectedPerson.fullName}
                className={styles.buttonAvatar}
              />
              <span>{selectedPerson.fullName}</span>
            </>
          ) : (
            <>
              <RiUser3Fill />
              <span>Assignee</span>
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

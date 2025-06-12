import {
  RiCloseCircleLine,
  RiNotification3Line,
  RiSearchLine,
} from "@remixicon/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDebounce } from "../../hooks/use-debounce";
import Avatar from "../avatar/avatar";
import Profile from "../profile/profile";
import styles from "./search-bar.module.css";
import type { FilterTaskInput, User } from "../../types/graphql";

interface SearchBarProps {
  user?: User;
  onApplyFilters: (filters: FilterTaskInput) => void;
}

interface SearchFormInput {
  search: string;
}

export default function SearchBar({ onApplyFilters, user }: SearchBarProps) {
  const { register, handleSubmit, reset, watch, setValue } =
    useForm<SearchFormInput>({
      defaultValues: {
        search: "",
      },
    });
  const [isFocused, setIsFocused] = useState(false);
  const watchSearchField = watch("search");
  const debouncedSearch = useDebounce(watchSearchField, 500);
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    if (debouncedSearch.trim() === "") {
      onApplyFilters({});
    } else {
      onApplyFilters({
        name: debouncedSearch.trim(),
      });
    }
  }, [debouncedSearch]);

  function onSubmit(data: SearchFormInput) {
    onApplyFilters({
      name: data.search,
    });
  }

  const clearFilters = () => {
    reset({ search: "" });
    onApplyFilters({});
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <RiSearchLine className={styles.formIcon} />
      <input
        type="text"
        placeholder="Search"
        {...register("search")}
        value={watchSearchField}
        onChange={(e) => setValue("search", e.target.value)}
        className={styles.formInput}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <div className={styles.formIconContainer}>
        {(watchSearchField || isFocused) && (
          <RiCloseCircleLine
            className={styles.formIcon}
            onClick={clearFilters}
          />
        )}
        <RiNotification3Line className={styles.formIcon} />
        <div style={{ position: "relative" }}>
          <Avatar
            size={"medium"}
            onClick={() => setShowProfile((prev) => !prev)}
            user={user}
          />
          {showProfile && <Profile onClose={() => setShowProfile(false)} />}
        </div>
      </div>
    </form>
  );
}

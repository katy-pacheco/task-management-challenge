import {
  RiCloseCircleLine,
  RiNotification3Line,
  RiSearchLine,
} from "@remixicon/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Avatar from "../avatar/avatar";
import styles from "./search-bar.module.css";

interface SearchInput {
  search: string;
}

export default function SearchBar() {
  const { register, handleSubmit, reset, watch } = useForm<SearchInput>();
  const [isFocused, setIsFocused] = useState(false);

  const searchValue = watch("search");

  function onSubmit(data: SearchInput) {
    console.log("Search query:", data.search);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <RiSearchLine className={styles.formIcon} />
      <input
        type="text"
        placeholder="Search"
        {...register("search")}
        className={styles.formInput}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <div className={styles.formIconContainer}>
        {(searchValue || isFocused) && (
          <RiCloseCircleLine
            className={styles.formIcon}
            onClick={() => reset()}
          />
        )}
        <RiNotification3Line className={styles.formIcon} />
        <Avatar size={"medium"} />
      </div>
    </form>
  );
}

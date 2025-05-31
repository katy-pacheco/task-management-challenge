import { faker } from "@faker-js/faker";
import {
  RiCloseCircleLine,
  RiNotification3Line,
  RiSearchLine,
} from "@remixicon/react";
import { useForm } from "react-hook-form";
import styles from "./search-bar.module.css";

interface SearchInput {
  search: string;
}

const avatar = faker.image.avatar();

export default function SearchBar() {
  const { register, handleSubmit, reset } = useForm<SearchInput>();

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
      />
      <div className={styles.formIconContainer}>
        <RiCloseCircleLine
          className={styles.formIcon}
          onClick={() => reset()}
        />
        <RiNotification3Line className={styles.formIcon} />
        <img src={avatar} alt="profile" className={styles.formAvatar} />
      </div>
    </form>
  );
}

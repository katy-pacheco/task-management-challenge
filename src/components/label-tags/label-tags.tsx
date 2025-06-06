import { useState } from "react";
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import styles from "./label-tags.module.css";
import { RiAddFill, RiPriceTag3Fill } from "@remixicon/react";
import { TaskTag } from "../../types/graphql";
import { getTaskTagLabel } from "../../utils/get-task-tag-label";

const initialLabels = [
  TaskTag.Android,
  TaskTag.Ios,
  TaskTag.NodeJs,
  TaskTag.Rails,
  TaskTag.React,
];

export default function LabelTags() {
  const [selectedLabels, setSelectedLabels] = useState([]);
  const [query, setQuery] = useState("");

  const filteredLabels =
    query === ""
      ? initialLabels
      : initialLabels.filter((label) =>
          label.toLowerCase().includes(query.toLowerCase()),
        );

  const isQueryExisting = initialLabels.some(
    (label) => label.toLowerCase() === query.toLowerCase(),
  );

  return (
    <div className={styles.wrapper}>
      <Combobox multiple value={selectedLabels} onChange={setSelectedLabels}>
        {({ open }) => (
          <>
            <ComboboxButton className={styles.comboboxButton}>
              <RiPriceTag3Fill />
              Label
            </ComboboxButton>
            {open && (
              <div className={styles.comboboxInputWrapper}>
                <ComboboxInput
                  className={styles.comboboxInput}
                  displayValue={(labels) => labels.join(", ")}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Tag Title"
                />

                <ComboboxOptions className="">
                  {query !== "" && !isQueryExisting && (
                    <ComboboxOption
                      value={query}
                      className={({ active }) =>
                        `${styles.option} ${styles.createNewOption} ${active ? styles.activeOption : ""}`
                      }
                    >
                      <div className={styles.createNewContent}>
                        <RiAddFill />
                        <span className={styles.createNewText}>
                          Create New Label "{query}"
                        </span>
                      </div>
                    </ComboboxOption>
                  )}
                  {filteredLabels.length === 0 &&
                  query !== "" &&
                  isQueryExisting ? (
                    <div className={styles.noResults}>
                      No matching labels found.
                    </div>
                  ) : (
                    filteredLabels.map((label) => (
                      <ComboboxOption
                        key={label}
                        value={label}
                        className={({ active, selected }) =>
                          `${styles.option} ${active ? styles.activeOption : ""} ${selected ? styles.selectedOption : ""}`
                        }
                      >
                        {({ selected }) => (
                          <div className={styles.labelOptionContent}>
                            <input
                              type="checkbox"
                              checked={selected}
                              readOnly
                              className={styles.checkbox}
                            />
                            <span className={styles.labelText}>
                              {getTaskTagLabel(label)}
                            </span>
                          </div>
                        )}
                      </ComboboxOption>
                    ))
                  )}
                </ComboboxOptions>
              </div>
            )}
          </>
        )}
      </Combobox>
    </div>
  );
}

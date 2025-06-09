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

interface LabelTagsProps {
  value: TaskTag[];
  onChange: (selected: TaskTag[]) => void;
}

const initialLabels = [
  TaskTag.Android,
  TaskTag.Ios,
  TaskTag.NodeJs,
  TaskTag.Rails,
  TaskTag.React,
];

export default function LabelTags({ value, onChange }: LabelTagsProps) {
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
      <Combobox value={value} onChange={onChange} multiple>
        {({ open }) => (
          <div className={styles.comboboxWrapper}>
            <ComboboxButton className={styles.comboboxButton}>
              {value.length > 0 ? (
                <div className={styles.selectedTagsContainer}>
                  {value.map((tag) => (
                    <span key={tag} className={styles.selectedTag}>
                      {getTaskTagLabel(tag)}
                    </span>
                  ))}
                </div>
              ) : (
                <div className={styles.placeholder}>
                  <RiPriceTag3Fill />
                  Label
                </div>
              )}
            </ComboboxButton>

            {open && (
              <div className={styles.comboboxInputWrapper}>
                <ComboboxInput
                  className={styles.comboboxInput}
                  displayValue={(labels) =>
                    Array.isArray(labels)
                      ? labels.map((label) => getTaskTagLabel(label)).join(", ")
                      : ""
                  }
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Tag Title"
                />

                <ComboboxOptions as="ul" className={styles.optionsList}>
                  {query !== "" && !isQueryExisting && (
                    <ComboboxOption
                      as="li"
                      value={query}
                      className={styles.option}
                    >
                      <div className={styles.createNewContent}>
                        <RiAddFill />
                        <span className={styles.createNewText}>
                          Create New Label "{query}"
                        </span>
                      </div>
                    </ComboboxOption>
                  )}

                  {filteredLabels.length === 0 && query !== "" ? (
                    <li className={styles.noResults}>
                      No matching labels found.
                    </li>
                  ) : (
                    filteredLabels.map((label) => (
                      <ComboboxOption
                        as="li"
                        key={label}
                        value={label}
                        className={({ selected }) =>
                          `${selected ? styles.selectedOption : ""}`
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
          </div>
        )}
      </Combobox>
    </div>
  );
}

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { PointEstimate } from "../../types/graphql";
import styles from "./point-estimate-dropdown.module.css";
import { getPointEstimateNumeric } from "../../utils/get-point-estimate-numeric";
import { RiIncreaseDecreaseFill } from "@remixicon/react";

interface PointEstimateDropdownProps {
  value: PointEstimate;
  onChange: (value: PointEstimate) => void;
}

const options = [
  PointEstimate.Zero,
  PointEstimate.One,
  PointEstimate.Two,
  PointEstimate.Four,
  PointEstimate.Eight,
];

export default function PointEstimateDropdown({
  value,
  onChange,
}: PointEstimateDropdownProps) {
  return (
    <div className={styles.dropdownWrapper}>
      <Menu as="div" className={styles.dropdownMenu}>
        <MenuButton className={styles.dropdownMenuButton}>
          <RiIncreaseDecreaseFill />
          Estimate
        </MenuButton>
        <MenuItems className={styles.dropdownMenuItems}>
          <span>Estimate</span>
          {options.map((option) => (
            <MenuItem key={option}>
              {({ focus }) => (
                <button
                  type="button"
                  onClick={() => onChange(option)}
                  className={`${styles.dropdownMenuItem} ${
                    focus ? styles.active : ""
                  } ${value === option ? styles.selected : ""}`}
                >
                  <RiIncreaseDecreaseFill />
                  {`${getPointEstimateNumeric(option)} Points`}
                </button>
              )}
            </MenuItem>
          ))}
        </MenuItems>
      </Menu>
    </div>
  );
}

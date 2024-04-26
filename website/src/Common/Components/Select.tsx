import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  selectLabel: {
    fontWeight: "bold",
    display: "block"
  },
  defaultSelect: {
    padding: "10px",
    background: "none",
    border: "1px solid lightgrey",
    display: "block"
  },
});

interface Props {
  id?: string;
  options: { id: number; label: string }[];
  showLabel?: boolean;
  label?: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  selectedId?: number | null;
}

const Select = ({
  id,
  options,
  showLabel,
  label,
  onChange,
  selectedId,
}: Props): JSX.Element => {
  const styles = useStyles();

  return (
    <>
      {showLabel && (
        <label htmlFor={id} className={styles.selectLabel}>
          {label}
        </label>
      )}
      <select
        id={id}
        onChange={onChange}
        defaultValue={selectedId ?? "unselectable"}
        className={styles.defaultSelect}
      >
        <option hidden disabled value="unselectable">
          {" "}
          -- select an option --{" "}
        </option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  );
};

export default Select;

import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  selectLabel: {
    fontWeight: "bold",
    display: "block",
    marginBottom: "5px",
  },
  defaultSelect: {
    padding: "10px",
    background: "none",
    border: "1px solid lightgrey",
    display: "block",
    width: "100%",
  },
});

interface Props {
  id?: string;
  options: { id: number; label: string }[];
  label?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  selectedId?: number | null;
  required?: boolean;
}

const Select = ({
  id,
  options,
  label,
  onChange,
  required,
}: Props): JSX.Element => {
  const styles = useStyles();

  return (
    <>
      {label && (
        <label htmlFor={id} className={styles.selectLabel}>
          {label}
        </label>
      )}
      <select
        id={id}
        onChange={onChange}
        className={styles.defaultSelect}
        required={required || false}
      >
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

import { formatDate } from "date-fns";
import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  dateLabel: {
    fontWeight: "bold",
    display: "block",
    marginBottom: "5px",
  },
  defaultDate: {
    padding: "10px",
    background: "none",
    border: "1px solid lightgrey",
    display: "block",
    width: "100%",
  },
});

interface Props {
  id: string;
  label?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: Date;
  required?: boolean;
}

const DateInput = ({
  id,
  label,
  onChange,
  value,
  required,
}: Props): JSX.Element => {
  const styles = useStyles();
  return (
    <>
      {label && <label className={styles.dateLabel}>{label}</label>}
      <input
        id={id}
        className={styles.defaultDate}
        type="date"
        onChange={onChange}
        defaultValue={value ? formatDate(value, "yyyy-MM-dd") : undefined}
        required={required || false}
      />
    </>
  );
};

export default DateInput;

import { formatDate } from "date-fns";
import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  dateLabel: {
    fontWeight: "bold",
    display: "block",
  },
  defaultDate: {
    padding: "10px",
    background: "none",
    border: "1px solid lightgrey",
    display: "block",
  },
});

interface Props {
  label?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showLabel?: boolean;
  value?: Date;
}

const DateInput = ({
  label,
  onChange,
  showLabel,
  value,
}: Props): JSX.Element => {
  const styles = useStyles();
  return (
    <>
      {showLabel && <label className={styles.dateLabel}>{label}</label>}
      <input
        className={styles.defaultDate}
        type="date"
        onChange={onChange}
        defaultValue={value ? formatDate(value, "yyyy-MM-dd") : undefined}
      />
    </>
  );
};

export default DateInput;

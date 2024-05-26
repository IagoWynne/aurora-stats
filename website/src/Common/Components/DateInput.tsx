import { formatDate } from "date-fns";
import React from "react";

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
  return (
    <>
      {label && <label>{label}</label>}
      <input
        id={id}
        type="date"
        onChange={onChange}
        defaultValue={value ? formatDate(value, "yyyy-MM-dd") : undefined}
        required={required || false}
      />
    </>
  );
};

export default DateInput;

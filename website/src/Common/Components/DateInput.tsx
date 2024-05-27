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
      {label && <label className="block">{label}</label>}
      <input
        id={id}
        type="date"
        onChange={onChange}
        defaultValue={value ? formatDate(value, "yyyy-MM-dd") : undefined}
        required={required || false}
        className="block w-full p-2 bg-gray-50 border-[1px] border-black h-[40px]"
      />
    </>
  );
};

export default DateInput;

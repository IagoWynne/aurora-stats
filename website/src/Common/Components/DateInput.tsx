import { formatDate } from "date-fns";
import React from "react";

interface Props {
  id: string;
  label?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: Date;
  required?: boolean;
  inlineLabel?: boolean;
}

const DateInput = ({
  id,
  label,
  onChange,
  value,
  required,
  inlineLabel,
}: Props): JSX.Element => {
  return (
    <div className={inlineLabel ? "flex justify-between items-center" : ""}>
      {label && <label className={inlineLabel ? "basis-1/12" : "block"}>{label}</label>}
      <input
        id={id}
        type="date"
        onChange={onChange}
        defaultValue={value ? formatDate(value, "yyyy-MM-dd") : undefined}
        required={required || false}
        className={`${inlineLabel ? "basis-11/12" : "w-full block p-2"} bg-gray-50 border-[1px] border-black h-[40px]`}
      />
    </div>
  );
};

export default DateInput;

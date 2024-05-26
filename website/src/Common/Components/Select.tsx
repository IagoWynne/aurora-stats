import React from "react";

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
  return (
    <>
      {label && <label htmlFor={id}>{label}</label>}
      <select id={id} onChange={onChange} required={required || false}>
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

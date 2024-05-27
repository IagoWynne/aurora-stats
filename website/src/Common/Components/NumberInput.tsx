import { HTMLProps } from "react";

interface Props extends HTMLProps<HTMLInputElement> {
  label?: string;
}

const NumberInput = ({ label, ...rest }: Props) => (
  <>
    {label && (
      <label htmlFor={rest.id} className="block">
        {label}
      </label>
    )}
    <input
      type="number"
      className="block w-full py-2 bg-gray-50 border-slate-800 border-b-[1px]"
      {...rest}
    />
  </>
);

export default NumberInput;

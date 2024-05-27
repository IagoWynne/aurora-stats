import { HTMLProps, PropsWithChildren } from "react";

interface Props extends PropsWithChildren<HTMLProps<HTMLButtonElement>> {
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

const Button = ({
  onClick,
  type,
  children,
  ...rest
}: Props): JSX.Element => {
  return (
    <button type={type ?? "button"} onClick={onClick} className={`button ${rest.className}`}>
      {children}
    </button>
  );
};

export default Button;

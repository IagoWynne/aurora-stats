import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  additionalClasses?: string;
}

const Button = ({
  onClick,
  type,
  additionalClasses,
  children,
}: Props): JSX.Element => {
  const buttonClasses = additionalClasses ? `${additionalClasses}` : "";

  return (
    <button type={type ?? "button"} onClick={onClick} className={buttonClasses}>
      {children}
    </button>
  );
};

export default Button;

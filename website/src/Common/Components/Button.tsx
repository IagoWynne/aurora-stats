import { createUseStyles } from "react-jss";
import { AURORA_LIGHT_GREEN } from "../../Colours";
import { PropsWithChildren } from "react";

const useStyles = createUseStyles({
  defaultButton: {
    background: AURORA_LIGHT_GREEN,
    padding: "10px",
    border: "none",
    borderRadius: 0,
    cursor: "pointer",
    fontWeight: "bold",
    width: "100%",
  },
});

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
  const styles = useStyles();

  const buttonClasses = additionalClasses
    ? `${additionalClasses} ${styles.defaultButton}`
    : styles.defaultButton;

  return (
    <button type={type ?? "button"} onClick={onClick} className={buttonClasses}>
      {children}
    </button>
  );
};

export default Button;

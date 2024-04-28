import { createUseStyles } from "react-jss";
import { AURORA_LIGHT_GREEN } from "../../COLOURS";
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
}

const Button = ({ onClick, type, children }: Props): JSX.Element => {
  const styles = useStyles();

  return (
    <button
      type={type ?? "button"}
      onClick={onClick}
      className={styles.defaultButton}
    >
      {children}
    </button>
  );
};

export default Button;

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
    onClick: () => void;
}

const Button = ({onClick, children}: Props): JSX.Element => {
    const styles = useStyles();
  
    return (
      <button type="button" onClick={onClick} className={styles.defaultButton}>
        {children}
      </button>
    );
  };
  
  export default Button;
  
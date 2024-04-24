import { createUseStyles } from "react-jss";
import { useWheelContext } from "../../contexts/WheelContext";
import { AURORA_LIGHT_GREEN } from "../../../Colours";

const useStyles = createUseStyles({
  addRunButton: {
    background: AURORA_LIGHT_GREEN,
    padding: "10px",
    border: "none",
    borderRadius: 0,
    cursor: "pointer",
    fontWeight: "bold",
    width: "100%"
  }
});

const AddRunButton = (): JSX.Element => {
  const { recordWheelWin } = useWheelContext();
  const styles = useStyles();

  return (
    <button type="button" onClick={() => recordWheelWin()} className={styles.addRunButton}>
      Add Run
    </button>
  );
};

export default AddRunButton;

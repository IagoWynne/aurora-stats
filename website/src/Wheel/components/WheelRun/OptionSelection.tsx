import { WheelOptionType } from "../../../types";
import { createUseStyles } from "react-jss";
import { AURORA_LIGHT_GREEN, AURORA_LIGHT_HOVER } from "../../../Colours";
import { useWheelContext } from "../../contexts/WheelContext";

const useStyles = createUseStyles({
  optionsContainer: {
    paddingTop: "1rem",
  },
  selected: {
    background: AURORA_LIGHT_GREEN,
  },
  title: {
    margin: 0,
    marginBottom: "3px"
  }
});

const OptionSelection = (): JSX.Element => {
  const { resultId, setResultId, wheelOptions } = useWheelContext();

  const styles = useStyles();

  return (
    <div className={styles.optionsContainer}>
      <p className={styles.title}>
        <b>Result</b>
      </p>
      {wheelOptions.map((option: WheelOptionType) => (
        <div
          key={option.id}
          onClick={() => setResultId(option.id)}
          className={resultId === option.id ? styles.selected : ""}
        >
          {option.name}
        </div>
      ))}
    </div>
  );
};

export default OptionSelection;

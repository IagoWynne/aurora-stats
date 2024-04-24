import { createUseStyles } from "react-jss";
import { PersonType } from "../../../types";
import { useWheelContext } from "../../contexts/WheelContext";
import { AURORA_LIGHT_GREEN } from "../../../Colours";

const useStyles = createUseStyles({
  resultsContainer: {
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

const WinnerSelection = (): JSX.Element => {
  const { people, winnerId, setWinnerId } = useWheelContext();
  const styles = useStyles();

  return (
    <div className={styles.resultsContainer}>
      <p className={styles.title}>
        <b>Winner</b>
      </p>
      {people.map((person: PersonType) => (
        <div
          key={person.id}
          onClick={() => setWinnerId(person.id)}
          className={winnerId === person.id ? styles.selected : ""}
        >
          {person.firstName} {person.lastName}
        </div>
      ))}
    </div>
  );
};

export default WinnerSelection;

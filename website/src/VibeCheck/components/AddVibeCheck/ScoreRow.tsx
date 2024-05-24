import { createUseStyles } from "react-jss";
import { VibeCheckPerson } from "../../types";

const useStyles = createUseStyles({
    input: {
        maxWidth: "120px"
    }
})

interface Props {
  people: VibeCheckPerson[];
  onScoreChange: (personId: number, score: number) => void;
}

const ScoreRow = ({ people, onScoreChange }: Props): JSX.Element => {
    const styles = useStyles();
  return (
    <tr>
      {people.map((person) => (
        <td key={person.id}>
          {person.isSelected && (
            <input
              type="number"
              required
              min={1}
              max={10}
              step={1}
              className={styles.input}
              onChange={(event) =>
                onScoreChange(person.id, Number(event.target.value))
              }
            />
          )}
        </td>
      ))}
    </tr>
  );
};

export default ScoreRow;
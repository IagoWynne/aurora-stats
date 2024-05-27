import { NumberInput } from "../../../Common";
import { VibeCheckPerson } from "../../types";

interface Props {
  people: VibeCheckPerson[];
  onScoreChange: (personId: number, score: number) => void;
}

const ScoreRow = ({ people, onScoreChange }: Props): JSX.Element => {
  return (
    <tr>
      {people.map((person) => (
        <td key={person.id}>
          {person.isSelected && (
            <NumberInput
              min={1}
              max={10}
              step={1}
              onChange={(event) =>
                onScoreChange(person.id, Number((event.target as any).value))
              }
              required
            />
          )}
        </td>
      ))}
    </tr>
  );
};

export default ScoreRow;

import { createUseStyles } from "react-jss";
import { Button } from "../../../Common";
import { VibeCheckPerson } from "../../types";
import { AURORA_DARK_GREEN } from "../../../Colours";

const useStyles = createUseStyles({
  button: {
    height: "100%",
  },
  selected: {
    backgroundColor: AURORA_DARK_GREEN,
  },
  notSelected: {
    backgroundColor: "transparent",
  },
});

interface Props {
  people: VibeCheckPerson[];
  togglePersonSelected: (id: number) => void;
}

const NameRow = ({ people, togglePersonSelected }: Props): JSX.Element => {
  const styles = useStyles();
  return (
    <tr>
      {people.map((person) => (
        <td key={person.id}>
          <Button
            onClick={() => togglePersonSelected(person.id)}
            additionalClasses={[
              styles.button,
              person.isSelected ? styles.selected : styles.notSelected,
            ].join(" ")}
          >
            {person.firstName}
          </Button>
        </td>
      ))}
    </tr>
  );
};

export default NameRow;

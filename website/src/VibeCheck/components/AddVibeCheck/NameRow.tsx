import { Button } from "../../../Common";
import { VibeCheckPerson } from "../../types";

interface Props {
  people: VibeCheckPerson[];
  togglePersonSelected: (id: number) => void;
}

const NameRow = ({ people, togglePersonSelected }: Props): JSX.Element => {
  return (
    <tr>
      {people.map((person) => (
        <td key={person.id} className={`w-[${100/people.length}%]`}>
          <Button onClick={() => togglePersonSelected(person.id)} className={`${person.isSelected ? "": "bg-red-400 hover:bg-red-300" }`}>
            {person.firstName}
          </Button>
        </td>
      ))}
    </tr>
  );
};

export default NameRow;

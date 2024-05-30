import { PersonType } from "../../../../types";

interface Props {
  people: PersonType[];
  selectedPeople: PersonType[];
  togglePersonSelected: (Person: PersonType) => void;
  prefixOptions?: SelectionOption[];
}

interface SelectionOption {
  label: string;
  toggleSelected: () => void;
  selected: boolean;
}

const PersonSelector = ({
  people,
  selectedPeople,
  togglePersonSelected,
  prefixOptions,
}: Props): JSX.Element => {
  return (
    <div className="flex justify-around">
      {prefixOptions &&
        prefixOptions?.map((option) => (
          <div key={option.label}>
            <label className="inline mr-2">{option.label}</label>
            <input
              type="checkbox"
              className="inline"
              onChange={option.toggleSelected}
              checked={option.selected}
            />
          </div>
        ))}
      {people.map((person) => (
        <div key={person.id}>
          <label className="inline mr-2">{person.firstName}</label>
          <input
            type="checkbox"
            className="inline"
            onChange={() => togglePersonSelected(person)}
            checked={selectedPeople.includes(person)}
          />
        </div>
      ))}
    </div>
  );
};

export default PersonSelector;

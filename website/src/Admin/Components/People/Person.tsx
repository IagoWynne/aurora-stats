import { PersonType } from "../../../types";

interface Props {
  person: PersonType;
}

const Person = ({ person }: Props): JSX.Element => {
  return (
    <div>
      {person.firstName} {person.lastName}
    </div>
  );
};

export default Person;

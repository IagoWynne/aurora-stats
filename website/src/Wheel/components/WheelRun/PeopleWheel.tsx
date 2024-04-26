import Wheel from "./Wheel";
import { useWheelContext } from "../../contexts/WheelContext";

interface Props {}

const PeopleWheel = ({}: Props): JSX.Element => {
  const { people } = useWheelContext();

  const peopleArray = people.map((person) => `${person.firstName}`);

  return (
    <div>
      <Wheel items={peopleArray} size={400} />
    </div>
  );
};

export default PeopleWheel;

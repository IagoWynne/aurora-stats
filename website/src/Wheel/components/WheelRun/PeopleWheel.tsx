import React from "react";
import { useWheelRunContext } from "../../contexts/WheelRunContext";
import Wheel from "./Wheel";

interface Props {}

const PeopleWheel = ({}: Props): JSX.Element => {
  const { people } = useWheelRunContext();

  const peopleArray = people.map(
    (person) => `${person.firstName}`
  );

  return (
    <div>
      <Wheel items={peopleArray} size={400} />
    </div>
  );
};

export default PeopleWheel;

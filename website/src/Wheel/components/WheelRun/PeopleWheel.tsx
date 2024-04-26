import React from "react";
import { useWheelContext } from "../../contexts/WheelContext";
import Wheel from "./Wheel";

interface Props {}

const PeopleWheel = ({}: Props): JSX.Element => {
  const { people } = useWheelContext();

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

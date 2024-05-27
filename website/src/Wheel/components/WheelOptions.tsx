import { useState } from "react";
import { useQuery } from "@apollo/client";
import { WheelOptionType } from "../../types";
import AddWheelOption from "./AddWheelOption";
import { GET_WHEEL_OPTIONS_QUERY } from "../queries";

const WheelOptions = (): JSX.Element => {
  const { loading, error, data } = useQuery(GET_WHEEL_OPTIONS_QUERY);
  const [addingOption, setAddingOption] = useState(false);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error! {error.message}</div>;
  }

  return (
    <div>
      {data.wheelOptions.map((option: WheelOptionType) => (
        <div key={option.id}>{option.name}</div>
      ))}
      {!addingOption && (
        <button onClick={() => setAddingOption(true)}>Add Option</button>
      )}
      {addingOption && (
        <AddWheelOption onSuccess={() => setAddingOption(false)} />
      )}
    </div>
  );
};

export default WheelOptions;

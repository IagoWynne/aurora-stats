import { useState } from "react";
import { useSuspenseQuery } from "@apollo/client";
import { WheelOptionType } from "../../../types";
import AddWheelOption from "./AddWheelOption";
import { GET_WHEEL_OPTIONS_QUERY } from "../../queries";
import { Button } from "../../../Common";

const WheelOptions = (): JSX.Element => {
  const { data } = useSuspenseQuery(GET_WHEEL_OPTIONS_QUERY);
  const [addingOption, setAddingOption] = useState(false);

  return (
    <div>
      {(data as any).wheelOptions.map((option: WheelOptionType) => (
        <div key={option.id}>{option.name}</div>
      ))}
      {!addingOption && (
        <Button onClick={() => setAddingOption(true)}>Add Option</Button>
      )}
      {addingOption && (
        <AddWheelOption onSuccess={() => setAddingOption(false)} />
      )}
    </div>
  );
};

export default WheelOptions;

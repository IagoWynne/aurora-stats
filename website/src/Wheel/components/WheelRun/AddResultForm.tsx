import React from "react";
import { useWheelRunContext } from "../../contexts/WheelRunContext";
import { Button, DateInput, Select } from "../../../Common";

import { useWheelContext } from "../../contexts/WheelContext";

const AddResultForm = (): JSX.Element => {
  const { runDate, recordWheelWin } = useWheelRunContext();
  const { wheelOptions, people } = useWheelContext();

  const availableResults = wheelOptions.map((option) => ({
    id: option.id,
    label: option.name,
  }));

  const availablePeople = people.map((person) => ({
    id: person.id,
    label: `${person.firstName} ${person.lastName}`,
  }));

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const target = event.target as typeof event.target & {
      winner: { value: string };
      result: { value: string };
      date: { value: string };
    };

    recordWheelWin(
      new Date(target.date.value),
      parseInt(target.winner.value),
      parseInt(target.result.value)
    );
  };

  return (
    <form onSubmit={(event) => onSubmit(event)}>
      <div className="flex flex-row justify-items-stretch">
        <div className="basis-1/3 p-2">
          <Select id="winner" options={availablePeople} label="Winner" />
        </div>
        <div className="basis-1/3 p-2">
          <Select id="result" options={availableResults} label="Result" />
        </div>
        <div className="basis-1/3 p-2">
          <DateInput id="date" label="Date" value={runDate} />
        </div>
      </div>
      <div className="m-2">
        <Button type="submit">Add Result</Button>
      </div>
    </form>
  );
};

export default AddResultForm;

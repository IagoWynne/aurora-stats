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
      parseInt(target.result.value),
    );
  };

  return (
    <form onSubmit={(event) => onSubmit(event)}>
      <div>
        <div>
          <Select id="winner" options={availablePeople} label="Winner" />
        </div>
        <div>
          <Select id="result" options={availableResults} label="Result" />
        </div>
        <div>
          <DateInput id="date" label="Date" value={runDate} />
        </div>
      </div>
      <Button type="submit">Add Result</Button>
    </form>
  );
};

export default AddResultForm;

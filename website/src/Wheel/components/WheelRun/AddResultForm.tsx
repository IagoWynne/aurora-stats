import React from "react";
import { useWheelContext } from "../../contexts/WheelContext";
import { Button, DateInput, Select } from "../../../Common";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  container: {
    padding: "0 0 1rem 0",
    display: "flex",
    justifyContent: "space-evenly",
    alignContent: "stretch",
    "& > div": {
      width: "30%"
    },
    marginLeft: "-22px"
  },
});

const AddResultForm = (): JSX.Element => {
  const styles = useStyles();
  const { people, wheelOptions, runDate, recordWheelWin } = useWheelContext();

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
      <div className={styles.container}>
        <div>
          <Select
            id="winner"
            options={availablePeople}
            label="Winner"
            showLabel
          />
        </div>
        <div>
          <Select
            id="result"
            options={availableResults}
            label="Result"
            showLabel
          />
        </div>
        <div>
          <DateInput id="date" showLabel label="Date" value={runDate} />
        </div>
      </div>
      <Button type="submit">Add Result</Button>
    </form>
  );
};

export default AddResultForm;

import { useState } from "react";
import { useVibeCheckContext } from "../../contexts/VibeCheckContext";
import { Button, DateInput, SectionContainer } from "../../../Common";
import { createUseStyles } from "react-jss";
import ADD_VIBE_CHECK_MUTATION from "../../queries/addVibeCheck";
import { useMutation } from "@apollo/client";
import { VibeCheckPerson } from "../../types";
import NameRow from "./NameRow";
import ScoreRow from "./ScoreRow";

const AddVibeCheck = (): JSX.Element => {
  const { people } = useVibeCheckContext();
  const [vibeCheckPeople, setVibeCheckPeople] = useState<VibeCheckPerson[]>(
    people.map((p) => ({ ...p, isSelected: true }))
  );
  const [addVibeCheck] = useMutation(ADD_VIBE_CHECK_MUTATION);
  const [submitted, setSubmitted] = useState(false);
  const [date, setDate] = useState(new Date());

  const togglePersonSelected = (personId: number) => {
    setVibeCheckPeople(
      vibeCheckPeople.map((person) =>
        person.id === personId
          ? { ...person, isSelected: !person.isSelected }
          : person
      )
    );
  };

  const onScoreChange = (personId: number, score: number) => {
    setVibeCheckPeople(
      vibeCheckPeople.map((person) =>
        person.id === personId ? { ...person, score } : person
      )
    );
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await addVibeCheck({
      variables: {
        date: date.toISOString(),
        scores: vibeCheckPeople
          .filter((p) => p.isSelected)
          .map((p) => ({ personId: p.id, score: p.score })),
      },
    });

    setSubmitted(true);
    setVibeCheckPeople(
      vibeCheckPeople.map((person) => ({
        ...person,
        isSelected: true,
        score: null,
      }))
    );
  };

  return (
    <SectionContainer title="Add Vibe Check">
      {!submitted && (
        <form onSubmit={(event) => onSubmit(event)}>
          <DateInput
            id="date"
            value={date}
            onChange={(event) => setDate(new Date(event.target.value))}
          />
          <table>
            <tbody>
              <NameRow
                people={vibeCheckPeople}
                togglePersonSelected={togglePersonSelected}
              />
              <ScoreRow
                people={vibeCheckPeople}
                onScoreChange={onScoreChange}
              />
            </tbody>
          </table>
          {vibeCheckPeople.filter(p => p.isSelected).length > 0 && <Button type="submit">Done</Button>}
        </form>
      )}
      {submitted && <Button onClick={() => setSubmitted(false)}>Reset</Button>}
    </SectionContainer>
  );
};

export default AddVibeCheck;

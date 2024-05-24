import { useState } from "react";
import { useVibeCheckContext } from "../../contexts/VibeCheckContext";
import { Button, SectionContainer } from "../../../Common";
import { createUseStyles } from "react-jss";
import { AURORA_DARK_GREEN } from "../../../Colours";
import { PersonType } from "../../../types";
import ADD_VIBE_CHECK_MUTATION from "../../queries/addVibeCheck";
import { useMutation } from "@apollo/client";

const useStyles = createUseStyles({
  container: {
    display: "flex",
    justifyContent: "space-evenly",
  },
  personName: {
    cursor: "pointer",
    padding: "2px",
    marginRight: "5px",
  },
  selected: {
    backgroundColor: AURORA_DARK_GREEN,
  },
  scoreInput: {
    width: "50px",
  },
});

const AddVibeCheck = (): JSX.Element => {
  const { people } = useVibeCheckContext();
  const [selectedPeople, setSelectedPeople] = useState<
    { id: number; score: number | null }[]
  >(people.map((p) => ({ id: p.id, score: null })));
  const [addVibeCheck] = useMutation(ADD_VIBE_CHECK_MUTATION);
  const [submitted, setSubmitted] = useState(false);

  const styles = useStyles();

  const togglePersonSelected = (person: PersonType) => {
    if (selectedPeople.some((p) => p.id === person.id)) {
      setSelectedPeople(selectedPeople.filter((p) => p.id != person.id));
    } else {
      setSelectedPeople([...selectedPeople, { id: person.id, score: null }]);
    }
  };

  const getPersonStyles = (person: PersonType) => {
    const personStyles = [styles.personName];

    if (selectedPeople.some((p) => p.id === person.id)) {
      personStyles.push(styles.selected);
    }

    return personStyles.join(" ");
  };

  const updatePersonScore = (person: PersonType, score: number) => {
    setSelectedPeople([
      ...selectedPeople.filter((p) => p.id != person.id),
      { id: person.id, score: score },
    ]);
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log(selectedPeople);

    const iso = new Date().toISOString();

    await addVibeCheck({
      variables: {
        date: `${iso.substring(0, iso.indexOf("T") + 1)}00:00:00Z`,
        scores: selectedPeople.map((p) => ({ personId: p.id, score: p.score })),
      },
    });

    setSelectedPeople(people.map((p) => ({ id: p.id, score: null })));
    setSubmitted(true);
  };

  return (
    <SectionContainer title="Add Vibe Check">
      {!submitted && <div className={styles.container}>
        <form onSubmit={(event) => onSubmit(event)}>
          <table>
            <tbody>
              {people.map((person) => (
                <tr key={person.id}>
                  <td
                    className={getPersonStyles(person)}
                    onClick={() => togglePersonSelected(person)}
                  >
                    {person.firstName} {person.lastName}
                  </td>
                  <td>
                    {selectedPeople.some((p) => p.id === person.id) && (
                      <input
                        type="number"
                        className={styles.scoreInput}
                        min={1}
                        max={10}
                        step={1}
                        id={person.id.toString()}
                        required
                        onChange={(event) =>
                          updatePersonScore(person, Number(event.target.value))
                        }
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {selectedPeople.length > 0 && <Button type="submit">Done</Button>}
        </form>
      </div>}
      {submitted && <Button onClick={() => setSubmitted(false)}>Reset</Button>}
    </SectionContainer>
  );
};

export default AddVibeCheck;

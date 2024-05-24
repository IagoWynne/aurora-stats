import { VibeCheckScore } from "../../types";

interface Props {
  scores: VibeCheckScore[];
  personId: number;
}

const PersonCell = ({ scores, personId }: Props): JSX.Element => {
  const score = scores.find((sc) => sc.person.id === personId);

  return <td>{score ? score.score : "-"}</td>;
};

export default PersonCell;

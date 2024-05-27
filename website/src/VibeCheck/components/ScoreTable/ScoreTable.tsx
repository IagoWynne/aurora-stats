import { formatDate } from "date-fns";
import { useVibeCheckContext } from "../../contexts/VibeCheckContext";
import { VibeCheck } from "../../types";
import PersonCell from "./PersonCell";
import AverageScore from "../AverageScore";

interface Props {
  vibeChecks: VibeCheck[];
}

const ScoreTable = ({ vibeChecks }: Props): JSX.Element => {
  const { people } = useVibeCheckContext();

  const formatVibeCheckDate = (date: string) =>
    formatDate(new Date(date), "dd/MM/yyyy");

  return (
    <table className="w-full table-auto text-center alternating-rows">
      <thead>
        <tr>
          <th className="w-auto">Date</th>
          {people.map((person) => (
            <th key={person.id}>{person.firstName}</th>
          ))}
          <th>Average</th>
        </tr>
      </thead>
      <tbody>
        {vibeChecks.map((vibeCheck) => (
          <tr key={vibeCheck.date}>
            <td>{formatVibeCheckDate(vibeCheck.date)}</td>
            {people.map((person) => (
              <PersonCell
                key={person.id}
                scores={vibeCheck.scores}
                personId={person.id}
              />
            ))}
            <td><AverageScore score={vibeCheck.averageScore} textSize="base"/></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ScoreTable;

import { formatDate } from "date-fns";
import { PersonType } from "../../../types";
import { VibeCheck } from "../../types";
import AverageScore from "../AverageScore";
import PersonCell from "./PersonCell";

interface Props {
  vibeChecks: VibeCheck[];
  people: PersonType[];
  showWeeklyAverageColumn: boolean;
  addSpacerRow: boolean;
}

const ScoreTableBody = ({
  vibeChecks,
  people,
  showWeeklyAverageColumn,
  addSpacerRow,
}: Props): JSX.Element => {
  const formatVibeCheckDate = (date: string) =>
    formatDate(new Date(date), "dd/MM/yyyy");

  const getWeeklyAverage = () =>
    vibeChecks.reduce(
      (total: number, vibeCheck: VibeCheck) =>
        (total += vibeCheck.averageScore),
      0
    ) / vibeChecks.length;

  return (
    <tbody>
      {addSpacerRow && (
        <tr>
          <td colSpan={people.length + 3}>
            <div className="spacer-row" />
          </td>
        </tr>
      )}
      {vibeChecks.map((vibeCheck, idx) => (
        <tr key={vibeCheck.date} className="h-full">
          <td>{formatVibeCheckDate(vibeCheck.date)}</td>
          {people.map((person) => (
            <PersonCell
              key={person.id}
              scores={vibeCheck.scores}
              personId={person.id}
            />
          ))}
          <td className="bg-gray-100 h-full">
            <AverageScore score={vibeCheck.averageScore} textSize="base" />
          </td>
          {showWeeklyAverageColumn && idx === 0 && (
            <td rowSpan={vibeChecks.length}>
              <AverageScore score={getWeeklyAverage()} />
            </td>
          )}
        </tr>
      ))}
    </tbody>
  );
};

export default ScoreTableBody;

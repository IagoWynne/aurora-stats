import { formatDate } from "date-fns";
import { PersonType } from "../../../types";
import { VibeCheck } from "../../types";
import AverageScore from "../AverageScore";
import PersonCell from "./PersonCell";

interface Props {
  vibeChecks: VibeCheck[];
  people: PersonType[];
  showWeeklyAverageColumn: boolean;
  weekAverage: number;
  addSpacerRow: boolean;
}

const ScoreTableBody = ({
  vibeChecks,
  people,
  showWeeklyAverageColumn,
  weekAverage,
  addSpacerRow,
}: Props): JSX.Element => {
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
        <tr key={vibeCheck.date.getDate()} className="h-full">
          <td>{formatDate(vibeCheck.date, "EEE dd/MM/yyyy")}</td>
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
              <AverageScore score={weekAverage} textSize="base"/>
            </td>
          )}
        </tr>
      ))}
    </tbody>
  );
};

export default ScoreTableBody;

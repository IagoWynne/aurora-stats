import { startOfWeek } from "date-fns";
import { useVibeCheckContext } from "../../contexts/VibeCheckContext";
import { VibeCheckWeek } from "../../types";
import ScoreTableBody from "./ScoreTableBody";

interface Props {
  vibeCheckWeeks: VibeCheckWeek[];
  showWeeklyAverageColumn?: boolean;
}

const ScoreTable = ({
  vibeCheckWeeks,
  showWeeklyAverageColumn = false,
}: Props): JSX.Element => {
  const { people } = useVibeCheckContext();

  return (
    <table className="w-full table-auto text-center alternating-rows h-1">
      <thead>
        <tr>
          <th className="w-auto">Date</th>
          {people.map((person) => (
            <th key={person.id}>{person.firstName}</th>
          ))}
          <th>Average</th>
          {showWeeklyAverageColumn && <th>Weekly Average</th>}
        </tr>
      </thead>
      {vibeCheckWeeks.map(({ vibeChecks }, idx) => (
        <ScoreTableBody
          vibeChecks={vibeChecks}
          people={people}
          showWeeklyAverageColumn={showWeeklyAverageColumn}
          addSpacerRow={idx > 0}
          key={idx}
        />
      ))}
    </table>
  );
};

export default ScoreTable;

import { useVibeCheckContext } from "../../contexts/VibeCheckContext";
import ScoreTableBody from "./ScoreTableBody";
import { useVibeCheckStatsContext } from "../../contexts/VibeCheckStatsContext";

interface Props {
  showWeeklyAverageColumn?: boolean;
}

const ScoreTable = ({
  showWeeklyAverageColumn = false,
}: Props): JSX.Element => {
  const { people } = useVibeCheckContext();
  const { vibeCheckWeeks } = useVibeCheckStatsContext();

  return (
    <table className="w-full table-auto text-center alternating-rows h-1">
      <thead>
        <tr>
          <th className="w-auto">Date</th>
          {people.map((person) => (
            <th key={person.id}>{person.firstName}</th>
          ))}
          <th>Day Average</th>
          {showWeeklyAverageColumn && <th>Weekly Average</th>}
        </tr>
      </thead>
      {vibeCheckWeeks.map(({ vibeChecks, weekAverage }, idx) => (
        <ScoreTableBody
          vibeChecks={vibeChecks}
          people={people}
          showWeeklyAverageColumn={showWeeklyAverageColumn}
          weekAverage={weekAverage}
          addSpacerRow={idx > 0}
          key={idx}
        />
      ))}
    </table>
  );
};

export default ScoreTable;

import { isMonday, startOfWeek } from "date-fns";
import { useVibeCheckContext } from "../../contexts/VibeCheckContext";
import { VibeCheck } from "../../types";
import ScoreTableBody from "./ScoreTableBody";

interface Props {
  vibeChecks: VibeCheck[];
  splitIntoWeeks?: boolean;
}

const ScoreTable = ({
  vibeChecks,
  splitIntoWeeks = false,
}: Props): JSX.Element => {
  const { people } = useVibeCheckContext();

  const vibeCheckWeeks: { vibeChecks: VibeCheck[] }[] = splitIntoWeeks
    ? []
    : [{ vibeChecks }];

  if (splitIntoWeeks) {
    const firstVibeCheckDate = new Date(vibeChecks[0].date);
    const firstIsStartOfWeek = isMonday(firstVibeCheckDate);

    let offset = firstIsStartOfWeek
      ? 0
      : firstVibeCheckDate.getDay() -
        startOfWeek(firstVibeCheckDate).getDay() -
        1;

    let vcWeek: { vibeChecks: VibeCheck[] } = { vibeChecks: [] };

    vibeChecks.forEach((vibeCheck) => {
      if (!offset) {
        vcWeek = { vibeChecks: [] };
      }
      
      vcWeek.vibeChecks.push(vibeCheck);
      offset++;

      if (offset === 5) {
        vibeCheckWeeks.push(vcWeek);
        offset = 0;
      }
    });

    if (offset) {
      vibeCheckWeeks.push(vcWeek);
    }
  }

  return (
    <table className="w-full table-auto text-center alternating-rows h-1">
      <thead>
        <tr>
          <th className="w-auto">Date</th>
          {people.map((person) => (
            <th key={person.id}>{person.firstName}</th>
          ))}
          <th>Average</th>
          {splitIntoWeeks && <th>Weekly Average</th>}
        </tr>
      </thead>
      {vibeCheckWeeks.map(({ vibeChecks }, idx) => (
        <ScoreTableBody
          vibeChecks={vibeChecks}
          people={people}
          showWeeklyAverageColumn={splitIntoWeeks}
          addSpacerRow={idx > 0}
          key={idx}
        />
      ))}
    </table>
  );
};

export default ScoreTable;

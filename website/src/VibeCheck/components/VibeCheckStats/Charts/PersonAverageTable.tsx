import { useMemo } from "react";
import { useVibeCheckContext } from "../../../contexts/VibeCheckContext";
import { useVibeCheckStatsContext } from "../../../contexts/VibeCheckStatsContext";
import calculateMean from "../../../utils/calculateMean";

const PersonAverageTable = (): JSX.Element => {
  const { people } = useVibeCheckContext();
  const { vibeChecks } = useVibeCheckStatsContext();

  const scores = useMemo(
    () => vibeChecks.flatMap((check) => check.scores),
    [vibeChecks]
  );

  const data = people.map((person) => {
    const personScores = scores
      .filter((s) => s.person.id === person.id)
      .map((s) => s.score);
    const average = calculateMean(personScores);

    return {
      name: person.firstName,
      score: average,
    };
  });

  return (
    <table className="w-full table-auto alternating-rows h-1 text-center">
      <thead>
        <tr>
          <th className="w-auto">Name</th>
          <th>Average Score</th>
        </tr>
      </thead>
      <tbody>
        {data.map((person) => (
          <tr key={person.name}>
            <td>{person.name}</td>
            <td>{person.score?.toFixed(2) || "-"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PersonAverageTable;

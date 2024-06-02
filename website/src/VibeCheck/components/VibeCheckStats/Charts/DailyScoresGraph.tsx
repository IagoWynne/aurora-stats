import { useVibeCheckStatsContext } from "../../../contexts/VibeCheckStatsContext";
import { useVibeCheckContext } from "../../../contexts/VibeCheckContext";
import { useMemo } from "react";
import { ChartData } from "../../../../types";
import AverageLineGraphWithPeople from "./AverageLineGraphWithPeople";

const DailyScoresGraph = (): JSX.Element => {
  const { people } = useVibeCheckContext();
  const { vibeChecks } = useVibeCheckStatsContext();

  const data: ChartData[] = useMemo(
    () =>
      vibeChecks.map((vibeCheck) => {
        const chartData: ChartData = {
          date: vibeCheck.formattedDate,
          Average: vibeCheck.averageScore,
        };

        people.forEach((person) => {
          const score =
            vibeCheck.scores.find((s) => s.person.id === person.id)?.score ??
            null;
          chartData[person.firstName] = score;
        });

        return chartData;
      }),
    [vibeChecks, people]
  );

  return <AverageLineGraphWithPeople people={people} data={data} />;
};

export default DailyScoresGraph;

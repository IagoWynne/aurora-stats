import { useVibeCheckStatsContext } from "../../../contexts/VibeCheckStatsContext";
import { formatDate } from "date-fns";
import { ChartData } from "../../../../types";
import { useVibeCheckContext } from "../../../contexts/VibeCheckContext";
import { useMemo } from "react";
import calculateMean from "../../../utils/calculateMean";
import AverageLineGraphWithPeople from "./AverageLineGraphWithPeople";

const WeeklyAveragesGraph = (): JSX.Element => {
  const { people } = useVibeCheckContext();
  const { vibeCheckWeeks } = useVibeCheckStatsContext();

  const data: ChartData[] = useMemo(
    () =>
      vibeCheckWeeks.map((vcw) => {
        const chartData: ChartData = {
          date: formatDate(vcw.weekStart, "dd/MM/yyyy"),
          Average: vcw.weekAverage,
        };

        people.forEach((person) => {
          const scores = vcw.vibeChecks
            .flatMap((vc) => vc.scores)
            .filter((s) => s.person.id === person.id)
            .map((s) => s.score);

          chartData[person.firstName] = calculateMean(scores);
        });

        return chartData;
      }),
    [vibeCheckWeeks, people]
  );

  return (
    <AverageLineGraphWithPeople people={people} data={data} />
  );
};

export default WeeklyAveragesGraph;

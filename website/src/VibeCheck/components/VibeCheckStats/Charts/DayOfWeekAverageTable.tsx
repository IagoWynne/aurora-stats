import { useMemo } from "react";
import { useVibeCheckStatsContext } from "../../../contexts/VibeCheckStatsContext";
import calculateMean from "../../../utils/calculateMean";
import {
  isFriday,
  isMonday,
  isThursday,
  isTuesday,
  isWednesday,
} from "date-fns";
import { VibeCheck } from "../../../types";

const DayOfWeekAverageTable = (): JSX.Element => {
  const { vibeChecks } = useVibeCheckStatsContext();

  const data = useMemo(() => [
    {
      day: "Monday",
      score: calculateMean(getScoresByDay(vibeChecks, isMonday)),
    },
    {
      day: "Tuesday",
      score: calculateMean(getScoresByDay(vibeChecks, isTuesday)),
    },
    {
      day: "Wednesday",
      score: calculateMean(getScoresByDay(vibeChecks, isWednesday)),
    },
    {
      day: "Thursday",
      score: calculateMean(getScoresByDay(vibeChecks, isThursday)),
    },
    {
      day: "Friday",
      score: calculateMean(getScoresByDay(vibeChecks, isFriday)),
    },
  ], [vibeChecks]);

  return (
    <table className="w-full table-auto alternating-rows h-1 text-center">
      <thead>
        <tr>
          <th className="w-auto">Day</th>
          <th>Average Score</th>
        </tr>
      </thead>
      <tbody>
        {data.map((day) => (
          <tr key={day.day}>
            <td>{day.day}</td>
            <td>{day.score?.toFixed(2) || "-"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const getScoresByDay = (
  vibeChecks: VibeCheck[],
  dayFilter: (date: Date) => boolean
): number[] =>
  vibeChecks
    .filter(
      (vibeCheck) => dayFilter(vibeCheck.date) && vibeCheck.averageScore != null
    )
    .map((vibeCheck) => vibeCheck.averageScore!);

export default DayOfWeekAverageTable;

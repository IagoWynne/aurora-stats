import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useVibeCheckStatsContext } from "../../../contexts/VibeCheckStatsContext";

const DailyAverageGraph = (): JSX.Element => {
  const { vibeChecks } = useVibeCheckStatsContext();

  return (
    <ResponsiveContainer height={250}>
      <LineChart data={vibeChecks}>
        <XAxis dataKey="formattedDate" />
        <YAxis />
        <Tooltip formatter={(value: number) => value.toFixed(2)}/>
        <Line
          type="monotone"
          dataKey="averageScore"
          isAnimationActive={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default DailyAverageGraph;

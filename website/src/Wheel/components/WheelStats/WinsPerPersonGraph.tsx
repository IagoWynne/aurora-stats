import {
  BarChart,
  Legend,
  XAxis,
  YAxis,
  Bar,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useWheelContext } from "../../contexts/WheelContext";
import { useWheelStatsContext } from "../../contexts/WheelStatsContext";
import {
  AURORA_BLUE,
  AURORA_DARK_GREEN,
  AURORA_LIGHT_GREEN,
  AURORA_LIGHT_HOVER,
} from "../../../COLOURS";

const WinsPerPersonGraph = (): JSX.Element => {
  const { people, wheelOptions } = useWheelContext();
  const { results } = useWheelStatsContext();

  const wheelOptionNames = wheelOptions.map((option) => option.name);

  const winsPerPerson = people.map((person) => {
    const wins = results.filter((result) => result.winner.id === person.id);
    const result: any = { name: `${person.firstName}` };
    wheelOptionNames.forEach((optionName) => {
      const winsForOption = wins.filter((win) => win.prize.name === optionName);
      result[optionName] = winsForOption.length;
    });

    return result;
  });

  const COLOURS = [
    AURORA_LIGHT_GREEN,
    AURORA_BLUE,
    AURORA_LIGHT_HOVER,
    AURORA_DARK_GREEN,
  ];

  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={winsPerPerson}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        {wheelOptionNames.map((optionName, i) => (
          <Bar key={i} dataKey={optionName} fill={COLOURS[i]} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default WinsPerPersonGraph;

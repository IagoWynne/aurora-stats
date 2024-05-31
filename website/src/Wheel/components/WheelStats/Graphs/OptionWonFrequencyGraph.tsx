import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from "recharts";
import { useWheelContext } from "../../../contexts/WheelContext";
import { useWheelStatsContext } from "../../../contexts/WheelStatsContext";
import { getColour } from "../../../../Common";

const OptionWonFrequencyGraph = (): JSX.Element => {
  const { wheelOptions } = useWheelContext();
  const { results } = useWheelStatsContext();

  const wheelOptionNames = wheelOptions.map((option) => option.name);

  const winsPerOption = wheelOptionNames.map((optionName) => {
    const wins = results.filter((result) => result.prize.name === optionName);
    return { name: optionName, value: wins.length };
  });

  const RADIAN = Math.PI / 180;

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }: any) => {
    if (!percent) {
      return <></>;
    }

    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const COLOURS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <ResponsiveContainer width={"100%"} height={250}>
      <PieChart>
        <Pie
          isAnimationActive={false}
          data={winsPerOption}
          dataKey="value"
          nameKey="name"
          label={renderCustomizedLabel}
          labelLine={false}
        >
          {winsPerOption.map((_, index) => (
            <Cell
              key={`cell-${index}`}
              fill={getColour(index)}
            />
          ))}
        </Pie>
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default OptionWonFrequencyGraph;

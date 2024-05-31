import { Bar, BarChart, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useWheelContext } from "../../../contexts/WheelContext";
import { useWheelStatsContext } from "../../../contexts/WheelStatsContext";
import { getColour } from "../../../../Common";

const TotalPerPersonGraph = (): JSX.Element => {
  const { people } = useWheelContext();
  const { results } = useWheelStatsContext();

  const totalPerPerson = people.map((person) => {
    const wins = results.filter((result) => result.winner.id === person.id);
    return { name: `${person.firstName}`, value: wins.length };
  });

  return (
    <ResponsiveContainer width={"100%"} height={250}>
      <BarChart data={totalPerPerson}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar fill={getColour(4)} dataKey="value" />
      </BarChart>
      {/* <PieChart>
        <Pie
          isAnimationActive={false}
          data={totalPerPerson}
          dataKey="value"
          nameKey="name"
          fill={AURORA_DARK_GREEN}
          label
        />
        <Legend />
      </PieChart> */}
    </ResponsiveContainer>
  );
};

export default TotalPerPersonGraph;

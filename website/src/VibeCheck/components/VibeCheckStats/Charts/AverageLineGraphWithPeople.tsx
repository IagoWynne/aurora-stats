import { useState } from "react";
import { ChartData, PersonType } from "../../../../types";
import PersonSelector from "./PersonSelector";
import {
  ResponsiveContainer,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from "recharts";
import { getColour } from "../../../../Common";

interface Props {
  people: PersonType[];
  data: ChartData[];
}

const AverageLineGraphWithPeople = ({ people, data }: Props): JSX.Element => {
  const [averageSelected, setAverageSelected] = useState(true);
  const [selectedPeople, setSelectedPeople] = useState<PersonType[]>([]);

  const togglePersonSelected = (person: PersonType) => {
    if (selectedPeople.includes(person)) {
      setSelectedPeople([...selectedPeople.filter((p) => p !== person)]);
    } else {
      setSelectedPeople([...selectedPeople, person]);
    }
  };

  return (
    <>
      <PersonSelector
        people={people}
        selectedPeople={selectedPeople}
        togglePersonSelected={togglePersonSelected}
        prefixOptions={[
          {
            label: "Average",
            toggleSelected: () => setAverageSelected(!averageSelected),
            selected: averageSelected,
          },
        ]}
      />
      <ResponsiveContainer height={300}>
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip formatter={(value: number) => value.toFixed(2)} />
          <Legend />
          {averageSelected && (
            <Line
              dot={false}
              type="monotone"
              dataKey="Average"
              isAnimationActive={false}
              strokeWidth={3}
              stroke="black"
            />
          )}
          {selectedPeople.map((person, idx) => (
            <Line
              dot={false}
              key={person.id}
              type="monotone"
              dataKey={person.firstName}
              isAnimationActive={false}
              stroke={getColour(idx)}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default AverageLineGraphWithPeople;

import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useVibeCheckStatsContext } from "../../../contexts/VibeCheckStatsContext";
import { useVibeCheckContext } from "../../../contexts/VibeCheckContext";
import { useState } from "react";
import { PersonType } from "../../../../types";
import { getColour } from "../../../../Common";
import PersonSelector from "./PersonSelector";

const DailyScoresGraph = (): JSX.Element => {
  const { people } = useVibeCheckContext();
  const { vibeChecks } = useVibeCheckStatsContext();
  const [averageSelected, setAverageSelected] = useState(true);
  const [selectedPeople, setSelectedPeople] = useState<PersonType[]>([...people]);

  const togglePersonSelected = (person: PersonType) => {
    if (selectedPeople.includes(person)) {
      setSelectedPeople([...selectedPeople.filter((p) => p !== person)]);
    } else {
      setSelectedPeople([...selectedPeople, person]);
    }
  };

  const data: ChartData[] = vibeChecks.map((vibeCheck) => {
    let chartData: ChartData = {
      formattedDate: vibeCheck.formattedDate,
      Average: vibeCheck.averageScore,
    };
    people.forEach((person) => {
      const score =
        vibeCheck.scores.find((s) => s.person.id === person.id)?.score ?? null;
      chartData[person.firstName] = score;
    });

    return chartData;
  });

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
            selected: averageSelected
          },
        ]}
      />
      <ResponsiveContainer height={300}>
        <LineChart data={data}>
          <XAxis dataKey="formattedDate" />
          <YAxis />
          <Tooltip formatter={(value: number) => value.toFixed(2)} />
          <Legend />
          {averageSelected && (
            <Line type="monotone" dataKey="Average" isAnimationActive={false} />
          )}
          {selectedPeople.map((person, idx) => (
            <Line
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

interface ChartData {
  [key: string]: string | number | null;
}

export default DailyScoresGraph;

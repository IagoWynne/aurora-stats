import { useState } from "react";
import { DateInput, SectionContainer } from "../../../Common";
import WheelResultsTable from "./WheelResultsTable";
import { subDays } from "date-fns";
import DateRangeSelector from "../../../Common/Components/DateRangeSelector";

interface Props {}

const WheelStats = ({}: Props): JSX.Element => {
  const [to, setTo] = useState(new Date());
  const [from, setFrom] = useState(new Date(subDays(to, 14)));

  return (
    <>
      <SectionContainer title="Show Stats Between">
        <DateRangeSelector
          from={from}
          to={to}
          fromChanged={setFrom}
          toChanged={setTo}
        />
      </SectionContainer>
      <SectionContainer title="Wheel Results">
        <WheelResultsTable from={from} to={to} />
      </SectionContainer>
    </>
  );
};

export default WheelStats;

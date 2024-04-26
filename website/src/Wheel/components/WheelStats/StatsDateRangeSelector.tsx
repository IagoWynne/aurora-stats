import DateRangeSelector from "../../../Common/Components/DateRangeSelector";
import { useWheelStatsContext } from "../../contexts/WheelStatsContext";

const StatsDateRangeSelector = (): JSX.Element => {
  const { from, to, setFrom, setTo } = useWheelStatsContext();
  return (
    <DateRangeSelector
      from={from}
      to={to}
      fromChanged={setFrom}
      toChanged={setTo}
    />
  );
};

export default StatsDateRangeSelector;

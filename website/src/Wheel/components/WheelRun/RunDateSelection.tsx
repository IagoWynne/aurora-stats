import { DateInput } from "../../../Common";
import { useWheelContext } from "../../contexts/WheelContext";

const RunDateSelection = (): JSX.Element => {
  const { setRunDate, runDate } = useWheelContext();

  return (
    <div>
      <DateInput
        showLabel
        label="Date"
        value={runDate}
        onChange={(event) => setRunDate(new Date(event.target.value))}
      />
    </div>
  );
};

export default RunDateSelection;

import { WheelOptionType } from "../../../types";
import { createUseStyles } from "react-jss";
import { AURORA_LIGHT_GREEN, AURORA_LIGHT_HOVER } from "../../../Colours";
import { useWheelContext } from "../../contexts/WheelContext";
import { Select } from "../../../Common";

const ResultSelection = (): JSX.Element => {
  const { resultId, setResultId, wheelOptions } = useWheelContext();

  const options = wheelOptions.map((option: WheelOptionType) => ({
    id: option.id,
    label: option.name,
  }));

  return (
    <div>
      <Select
        id="result"
        options={options}
        label="Result"
        showLabel
        onChange={(event) => setResultId(Number(event.target.value))}
        selectedId={resultId}
      />
    </div>
  );
};

export default ResultSelection;

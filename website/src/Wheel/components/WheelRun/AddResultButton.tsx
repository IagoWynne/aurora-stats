import { useWheelContext } from "../../contexts/WheelContext";
import { Button } from "../../../Common";

const AddResultButton = (): JSX.Element => {
  const { recordWheelWin } = useWheelContext();

  return <Button onClick={() => recordWheelWin()}>Add Result</Button>;
};

export default AddResultButton;

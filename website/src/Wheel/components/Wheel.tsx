import { useQuery } from "@apollo/client";
import { GET_WHEEL_OPTIONS_QUERY } from "../queries";
import WheelOptions from "./WheelOptions";

const Wheel = (): JSX.Element => {
  return (
    <div>
      <WheelOptions />
    </div>
  );
};

export default Wheel;

import { SectionContainer } from "../../../Common";
import WheelResultsTable from "./WheelResultsTable";

interface Props {}

const WheelStats = ({}: Props): JSX.Element => {
  return (
    <SectionContainer>
      <WheelResultsTable />
    </SectionContainer>
  );
};

export default WheelStats;

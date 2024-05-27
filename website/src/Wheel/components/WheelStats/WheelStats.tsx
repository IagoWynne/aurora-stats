import { SectionContainer } from "../../../Common";
import WheelResultsTable from "./WheelResultsTable";
import StatsDateRangeSelector from "./StatsDateRangeSelector";
import { WheelContextProvider } from "../../contexts/WheelContext";
import { WheelStatsContextProvider } from "../../contexts/WheelStatsContext";
import WinsPerPersonGraph from "./WinsPerPersonGraph";

const WheelStats = (): JSX.Element => {
  return (
    <WheelContextProvider>
      <WheelStatsContextProvider>
        <SectionContainer>
          <StatsDateRangeSelector />
        </SectionContainer>
        <SectionContainer title="Wheel Results">
          <WheelResultsTable />
        </SectionContainer>
        <SectionContainer title="Wins Per Person">
          <WinsPerPersonGraph />
        </SectionContainer>
      </WheelStatsContextProvider>
    </WheelContextProvider>
  );
};

export default WheelStats;

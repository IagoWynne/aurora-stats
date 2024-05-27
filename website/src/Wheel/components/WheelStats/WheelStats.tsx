import { ContainerContent, SectionContainer } from "../../../Common";
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
          <ContainerContent>
            <StatsDateRangeSelector />
          </ContainerContent>
        </SectionContainer>
        <SectionContainer title="Wheel Results">
          <ContainerContent>
            <WheelResultsTable />
          </ContainerContent>
        </SectionContainer>
        <SectionContainer title="Wins Per Person">
          <ContainerContent>
            <WinsPerPersonGraph />
          </ContainerContent>
        </SectionContainer>
      </WheelStatsContextProvider>
    </WheelContextProvider>
  );
};

export default WheelStats;

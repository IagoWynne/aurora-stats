import { ContainerContent, SectionContainer } from "../../../Common";
import WheelResultsTable from "./WheelResultsTable";
import StatsDateRangeSelector from "./StatsDateRangeSelector";
import { WheelContextProvider } from "../../contexts/WheelContext";
import { WheelStatsContextProvider } from "../../contexts/WheelStatsContext";
import WinsPerPersonGraph from "./Graphs/WinsPerPersonGraph";
import TotalPerPersonGraph from "./Graphs/TotalPerPersonGraph";
import OptionWonFrequencyGraph from "./Graphs/OptionWonFrequencyGraph";
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
        <SectionContainer title="Total Wins Per Person">
          <ContainerContent>
            <TotalPerPersonGraph />
          </ContainerContent>
        </SectionContainer>
        <SectionContainer title="Results Breakdown By Person">
          <ContainerContent>
            <WinsPerPersonGraph />
          </ContainerContent>
        </SectionContainer>
        <SectionContainer title="Total Wins Per Option">
          <ContainerContent>
            <OptionWonFrequencyGraph />
          </ContainerContent>
        </SectionContainer>
      </WheelStatsContextProvider>
    </WheelContextProvider>
  );
};

export default WheelStats;

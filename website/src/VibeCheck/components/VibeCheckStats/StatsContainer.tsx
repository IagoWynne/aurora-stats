import { VibeCheckContextProvider } from "../../contexts/VibeCheckContext";
import { ContainerContent, SectionContainer } from "../../../Common";
import { VibeCheckStatsContextProvider } from "../../contexts/VibeCheckStatsContext";
import ScoreTableWithAverage from "../ScoreTableWithAverage";
import { DailyAverageGraph } from "./Charts";

interface Props {
  from: Date;
  to: Date;
}

const StatsContainer = ({ from, to }: Props): JSX.Element => {
  return (
    <>
      <VibeCheckContextProvider>
        <VibeCheckStatsContextProvider from={from} to={to}>
          <ScoreTableWithAverage
            title="Vibe Check Scores Table"
            showWeeklyAverageColumn
          />
          <SectionContainer title="Daily Averages over Time">
            <ContainerContent>
              <DailyAverageGraph />
            </ContainerContent>
          </SectionContainer>
          <SectionContainer title="Weekly Averages over Time">
            <ContainerContent></ContainerContent>
          </SectionContainer>
          <SectionContainer title="Average Score on Day of Week">
            <ContainerContent></ContainerContent>
          </SectionContainer>
          <SectionContainer title="Average Score per Person">
            <ContainerContent></ContainerContent>
          </SectionContainer>
        </VibeCheckStatsContextProvider>
      </VibeCheckContextProvider>
    </>
  );
};

export default StatsContainer;

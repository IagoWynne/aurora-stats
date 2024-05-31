import { ContainerContent, SectionContainer } from "../../../Common";
import ScoreTableWithAverage from "../ScoreTableWithAverage";
import {
  DailyScoresGraph,
  DayOfWeekAverageTable,
  PersonAverageTable,
} from "./Charts";

const StatsContainer = (): JSX.Element => {
  return (
    <div className="flex flex-wrap justify-between items-stretch">
      <ScoreTableWithAverage
        title="Vibe Check Scores Table"
        showWeeklyAverageColumn
        className="basis-full"
      />
      <SectionContainer title="Average Score per Person" className="basis-1/3">
        <ContainerContent>
          <PersonAverageTable />
        </ContainerContent>
      </SectionContainer>
      <SectionContainer title="Daily Scores over Time" className="basis-2/3">
        <ContainerContent>
          <DailyScoresGraph />
        </ContainerContent>
      </SectionContainer>
      <SectionContainer title="Weekly Averages over Time" className="basis-2/3">
        <ContainerContent></ContainerContent>
      </SectionContainer>
      <SectionContainer
        title="Average Score on Day of Week"
        className="basis-1/3"
      >
        <ContainerContent>
          <DayOfWeekAverageTable />
        </ContainerContent>
      </SectionContainer>
    </div>
  );
};

export default StatsContainer;

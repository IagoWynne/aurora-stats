import { ContainerContent, SectionContainer } from "../../../Common";
import { useVibeCheckStatsContext } from "../../contexts/VibeCheckStatsContext";
import calculateMean from "../../utils/calculateMean";
import AverageScore from "../AverageScore";
import ScoreTable from "../ScoreTable";
import {
  DailyScoresGraph,
  DayOfWeekAverageTable,
  PersonAverageTable,
  WeeklyAveragesGraph,
} from "./Charts";

const StatsContainer = (): JSX.Element => {
  const { vibeCheckWeeks } = useVibeCheckStatsContext();
  return (
    <div className="grid grid-cols-12 gap-1 grid-rows-1">
      <SectionContainer title="Vibe Check Scores Table" className="col-span-8">
        <ContainerContent>
          <ScoreTable />
        </ContainerContent>
      </SectionContainer>
      <SectionContainer title="Average Score" className="col-span-4">
        <ContainerContent>
          <AverageScore
            score={calculateMean(
              vibeCheckWeeks.flatMap((vcw) =>
                vcw.vibeChecks
                  .filter((vc) => vc.averageScore !== null)
                  .map((vc) => vc.averageScore!)
              )
            )}
          />
        </ContainerContent>
      </SectionContainer>
      <SectionContainer title="Average Score per Person" className="col-span-3">
        <ContainerContent>
          <PersonAverageTable />
        </ContainerContent>
      </SectionContainer>
      <SectionContainer title="Daily Scores over Time" className="col-span-9">
        <ContainerContent>
          <DailyScoresGraph />
        </ContainerContent>
      </SectionContainer>
      <SectionContainer
        title="Weekly Averages over Time"
        className="col-span-9"
      >
        <ContainerContent>
          <WeeklyAveragesGraph />
        </ContainerContent>
      </SectionContainer>
      <SectionContainer
        title="Average Score on Day of Week"
        className="col-span-3"
      >
        <ContainerContent>
          <DayOfWeekAverageTable />
        </ContainerContent>
      </SectionContainer>
    </div>
  );
};

export default StatsContainer;

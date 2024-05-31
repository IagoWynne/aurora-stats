import { ContainerContent, SectionContainer } from "../../../Common";
import ScoreTable from "../ScoreTable";
import { VibeCheckWeek } from "../../types";
import AverageScore from "../AverageScore";
import { Link } from "react-router-dom";
import { useVibeCheckStatsContext } from "../../contexts/VibeCheckStatsContext";
import { HTMLProps } from "react";

interface Props extends HTMLProps<HTMLDivElement>{
  title: string;
  showFullStatsButton?: boolean;
  showWeeklyAverageColumn?: boolean;
}

const ScoreTableWithAverage = ({
  title,
  showFullStatsButton = false,
  showWeeklyAverageColumn = false,
  ...rest
}: Props): JSX.Element => {
  const {vibeCheckWeeks} = useVibeCheckStatsContext()

  return (
    <div className={`flex justify-between items-stretch ${rest.className}`}>
      <SectionContainer
        title={title}
        className="basis-2/3"
      >
        <ContainerContent>
          <ScoreTable showWeeklyAverageColumn={showWeeklyAverageColumn}/>
          {showFullStatsButton && (
            <Link to="/vibecheck/stats" className="button-link mt-2">
              View Full Stats
            </Link>
          )}
        </ContainerContent>
      </SectionContainer>
      <SectionContainer title="Average Score" className="basis-1/3">
        <ContainerContent>
          <AverageScore
            score={
              vibeCheckWeeks.length
                ? vibeCheckWeeks.reduce(
                    (total: number, current: VibeCheckWeek) =>
                      (total += current.weekAverage),
                    0
                  ) / vibeCheckWeeks.length
                : null
            }
          />
        </ContainerContent>
      </SectionContainer>
    </div>
  );
};

export default ScoreTableWithAverage;

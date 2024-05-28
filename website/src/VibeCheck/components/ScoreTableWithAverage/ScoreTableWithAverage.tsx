import { formatDate } from "date-fns";
import { ContainerContent, SectionContainer } from "../../../Common";
import ScoreTable from "../ScoreTable";
import { useSuspenseQuery } from "@apollo/client";
import { GET_VIBE_CHECK_BETWEEN } from "../../queries/getVibeCheckBetween";
import { VibeCheckWeek } from "../../types";

import AverageScore from "../AverageScore";
import { Link } from "react-router-dom";
import useVibeChecksQuery from "../../hooks/useVibeChecksQuery";

interface Props {
  from: Date;
  to: Date;
  showFullStatsButton?: boolean;
}

const ScoreTableWithAverage = ({
  from,
  to,
  showFullStatsButton = false,
}: Props): JSX.Element => {
  const vibeCheckWeeks = useVibeChecksQuery(from, to);

  return (
    <div className="flex justify-between items-stretch">
      <SectionContainer
        title={`Scores between ${formatDate(
          from,
          "dd/MM/yyyy"
        )} and ${formatDate(to, "dd/MM/yyyy")}`}
        className="basis-2/3"
      >
        <ContainerContent>
          <ScoreTable vibeCheckWeeks={vibeCheckWeeks} />
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

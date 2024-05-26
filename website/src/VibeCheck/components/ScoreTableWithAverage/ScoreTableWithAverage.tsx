import { formatDate } from "date-fns";
import { SectionContainer } from "../../../Common";
import ScoreTable from "../ScoreTable/ScoreTable";
import { useSuspenseQuery } from "@apollo/client";
import { GET_VIBE_CHECK_BETWEEN } from "../../queries/getVibeCheckBetween";
import { VibeCheck } from "../../types";

import AverageScore from "../AverageScore";

interface Props {
  from: Date;
  to: Date;
}

const ScoreTableWithAverage = ({ from, to }: Props): JSX.Element => {
  const { data } = useSuspenseQuery<{ vibeChecks: VibeCheck[] }>(
    GET_VIBE_CHECK_BETWEEN,
    {
      variables: {
        from: from.toISOString(),
        to: to.toISOString(),
      },
    },
  );

  return (
    <div>
      <div>
        <SectionContainer
          title={`Scores between ${formatDate(
            from,
            "dd/MM/yyyy",
          )} and ${formatDate(to, "dd/MM/yyyy")}`}
        >
          <ScoreTable vibeChecks={data.vibeChecks} />
        </SectionContainer>
      </div>
      <div>
        <SectionContainer title="Average Score">
          <AverageScore
            score={
              data.vibeChecks.length
                ? data.vibeChecks.reduce(
                    (total: number, current: VibeCheck) =>
                      (total += current.averageScore),
                    0,
                  ) / data.vibeChecks.length
                : null
            }
          />
        </SectionContainer>
      </div>
    </div>
  );
};

export default ScoreTableWithAverage;

import { formatDate } from "date-fns";
import { SectionContainer } from "../../../Common";
import ScoreTable from "../ScoreTable/ScoreTable";
import { useSuspenseQuery } from "@apollo/client";
import { GET_VIBE_CHECK_BETWEEN } from "../../queries/getVibeCheckBetween";
import { VibeCheck } from "../../types";
import { createUseStyles } from "react-jss";
import AverageScore from "../AverageScore";

const useStyles = createUseStyles({
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "stretch",
  },
  scoreTable: {
    width: "65%",
  },
  scoreBox: {
    width: "32%",
  },
});

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
    }
  );
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <div className={styles.scoreTable}>
        <SectionContainer
          title={`Scores between ${formatDate(
            from,
            "dd/MM/yyyy"
          )} and ${formatDate(to, "dd/MM/yyyy")}`}
        >
          <ScoreTable vibeChecks={data.vibeChecks} />
        </SectionContainer>
      </div>
      <div className={styles.scoreBox}>
        <SectionContainer title="Average Score">
          <AverageScore
            score={data.vibeChecks.length ?
              data.vibeChecks.reduce(
                (total: number, current: VibeCheck) =>
                  (total += current.averageScore),
                0
              ) / data.vibeChecks.length : null
            }
          />
        </SectionContainer>
      </div>
    </div>
  );
};

export default ScoreTableWithAverage;

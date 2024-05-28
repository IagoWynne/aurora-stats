import { useSuspenseQuery } from "@apollo/client";
import { GET_VIBE_CHECK_BETWEEN } from "../../queries/getVibeCheckBetween";
import { VibeCheckDTO } from "../../types";
import ScoreTable from "../ScoreTable";
import { VibeCheckContextProvider } from "../../contexts/VibeCheckContext";
import { ContainerContent, SectionContainer } from "../../../Common";
import useVibeChecksQuery from "../../hooks/useVibeChecksQuery";

interface Props {
  from: Date;
  to: Date;
}

const StatsContainer = ({ from, to }: Props): JSX.Element => {
  const vibeCheckWeeks = useVibeChecksQuery(from, to);

  return (
    <>
      <VibeCheckContextProvider>
        <SectionContainer title="Vibe Check Scores Table">
          <ContainerContent>
            <ScoreTable vibeCheckWeeks={vibeCheckWeeks} showWeeklyAverageColumn />
          </ContainerContent>
        </SectionContainer>
      </VibeCheckContextProvider>
    </>
  );
};

export default StatsContainer;

import { useSuspenseQuery } from "@apollo/client";
import { GET_VIBE_CHECK_BETWEEN } from "../../queries/getVibeCheckBetween";
import { VibeCheck } from "../../types";
import ScoreTable from "../ScoreTable";
import { VibeCheckContextProvider } from "../../contexts/VibeCheckContext";
import { ContainerContent, SectionContainer } from "../../../Common";

interface Props {
  from: Date;
  to: Date;
}

const StatsContainer = ({ from, to }: Props): JSX.Element => {
  const { data } = useSuspenseQuery<{ vibeChecks: VibeCheck[] }>(
    GET_VIBE_CHECK_BETWEEN,
    {
      variables: {
        to,
        from,
      },
    }
  );
  return (
    <>
      <VibeCheckContextProvider>
        <SectionContainer title="Vibe Check Scores Table">
          <ContainerContent>
            <ScoreTable vibeChecks={data.vibeChecks} splitIntoWeeks />
          </ContainerContent>
        </SectionContainer>
      </VibeCheckContextProvider>
    </>
  );
};

export default StatsContainer;

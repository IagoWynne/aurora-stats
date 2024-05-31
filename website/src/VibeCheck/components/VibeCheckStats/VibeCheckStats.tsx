import { Suspense, useState } from "react";
import {
  ContainerContent,
  DateRangeSelector,
  Loading,
  SectionContainer,
} from "../../../Common";
import { isMonday, previousMonday, subDays } from "date-fns";
import StatsContainer from "./StatsContainer";
import { VibeCheckContextProvider } from "../../contexts/VibeCheckContext";
import { VibeCheckStatsContextProvider } from "../../contexts/VibeCheckStatsContext";

const VibeCheckStats = (): JSX.Element => {
  const [to, setTo] = useState(new Date());
  const [from, setFrom] = useState(isMonday(to) ? new Date(subDays(to, 28)) : new Date(subDays(previousMonday(to), 28)));

  return (
    <>
      <SectionContainer title="Vibe Check Stats Between" className="sticky">
        <ContainerContent>
          <DateRangeSelector
            from={from}
            to={to}
            fromChanged={setFrom}
            toChanged={setTo}
          />
        </ContainerContent>
      </SectionContainer>
      <Suspense fallback={<Loading />}>

    <VibeCheckContextProvider>
      <VibeCheckStatsContextProvider from={from} to={to}>
        <StatsContainer/>
      </VibeCheckStatsContextProvider>
    </VibeCheckContextProvider>
      </Suspense>
    </>
  );
};

export default VibeCheckStats;

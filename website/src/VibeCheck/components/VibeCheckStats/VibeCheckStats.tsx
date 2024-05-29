import { Suspense, useState } from "react";
import {
  ContainerContent,
  DateRangeSelector,
  Loading,
  SectionContainer,
} from "../../../Common";
import { subDays } from "date-fns";
import StatsContainer from "./StatsContainer";

const VibeCheckStats = (): JSX.Element => {
  const [to, setTo] = useState(new Date());
  const [from, setFrom] = useState(new Date(subDays(to, 28)));

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
        <StatsContainer from={from} to={to}/>
      </Suspense>
    </>
  );
};

export default VibeCheckStats;

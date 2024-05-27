import { WheelRunContextProvider } from "../../contexts/WheelRunContext";
import { ContainerContent, SectionContainer } from "../../../Common";
import WheelResultsTable from "../WheelStats/WheelResultsTable";
import PeopleWheel from "./PeopleWheel";
import AddResultForm from "./AddResultForm";
import { WheelContextProvider } from "../../contexts/WheelContext";
import { WheelStatsContextProvider } from "../../contexts/WheelStatsContext";

const WheelResults = (): JSX.Element => {
  return (
    <WheelContextProvider>
      <WheelRunContextProvider>
        <WheelStatsContextProvider>
          <div className="m-auto max-w-screen-xl">
            {/* <SectionContainer>
        <p>The Wheel</p>
        <div>
          <PeopleWheel />
        </div>
      </SectionContainer> */}
            <SectionContainer title="Add Wheel Result">
              <ContainerContent>
                <AddResultForm />
              </ContainerContent>
            </SectionContainer>
            <SectionContainer title="Recent Runs">
              <ContainerContent>
                <WheelResultsTable showFullStatsButton />
              </ContainerContent>
            </SectionContainer>
          </div>
        </WheelStatsContextProvider>
      </WheelRunContextProvider>
    </WheelContextProvider>
  );
};

export default WheelResults;

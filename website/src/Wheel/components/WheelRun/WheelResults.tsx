import { createUseStyles } from "react-jss";
import { WheelRunContextProvider } from "../../contexts/WheelRunContext";
import { SectionContainer } from "../../../Common";
import WheelResultsTable from "../WheelStats/WheelResultsTable";
import PeopleWheel from "./PeopleWheel";
import AddResultForm from "./AddResultForm";
import { Link } from "react-router-dom";
import { WheelContextProvider } from "../../contexts/WheelContext";
import { WheelStatsContextProvider } from "../../contexts/WheelStatsContext";

const WheelResults = (): JSX.Element => {

  return (
    <WheelContextProvider>
      <WheelRunContextProvider>
        <WheelStatsContextProvider>
          <Link to="/wheel/stats">Wheel Stats</Link>
          {/* <SectionContainer>
        <p className={styles.title}>The Wheel</p>
        <div className={styles.container}>
          <PeopleWheel />
        </div>
      </SectionContainer> */}
          <SectionContainer title="Add Wheel Result">
            <AddResultForm />
          </SectionContainer>
          <SectionContainer title="Recent Runs">
            <WheelResultsTable />
          </SectionContainer>
        </WheelStatsContextProvider>
      </WheelRunContextProvider>
    </WheelContextProvider>
  );
};

export default WheelResults;

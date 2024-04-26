import { createUseStyles } from "react-jss";
import { WheelRunContextProvider } from "../../contexts/WheelRunContext";
import { SectionContainer } from "../../../Common";
import WheelResultsTable from "../WheelStats/WheelResultsTable";
import PeopleWheel from "./PeopleWheel";
import AddResultForm from "./AddResultForm";
import { Link } from "react-router-dom";

const useStyles = createUseStyles({
  title: {
    margin: 0,
    fontWeight: "bold",
    paddingBottom: "1rem",
  },
});

const WheelResults = (): JSX.Element => {
  const styles = useStyles();

  return (
    <WheelRunContextProvider>
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
    </WheelRunContextProvider>
  );
};

export default WheelResults;

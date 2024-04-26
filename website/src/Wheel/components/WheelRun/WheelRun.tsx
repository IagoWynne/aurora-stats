import { createUseStyles } from "react-jss";
import { WheelContextProvider } from "../../contexts/WheelContext";
import WinnerSelection from "./WinnerSelection";
import ResultSelection from "./ResultSelection";
import AddResultButton from "./AddRunButton";
import { SectionContainer } from "../../../Common";
import RunDateSelection from "./RunDateSelection";
import WheelResultsTable from "../WheelStats/WheelResultsTable";
import PeopleWheel from "./PeopleWheel";

const useStyles = createUseStyles({
  container: {
    padding: "0 0 1rem 0",
    display: "flex",
    justifyContent: "flex-start",
    "& > div + div": {
      marginLeft: "1rem",
    },
  },
  title: {
    margin: 0,
    fontWeight: "bold",
    paddingBottom: "1rem",
  },
  dateLabel: {
    fontWeight: "bold",
    display: "block",
  },
});

const WheelRun = (): JSX.Element => {
  const styles = useStyles();

  return (
    <WheelContextProvider>
      {/* <SectionContainer>
        <p className={styles.title}>The Wheel</p>
        <div className={styles.container}>
          <PeopleWheel />
        </div>
      </SectionContainer> */}
      <SectionContainer>
        <p className={styles.title}>Recent Runs</p>
        <WheelResultsTable />
      </SectionContainer>
      <SectionContainer>
        <p className={styles.title}>Add Wheel Result</p>
        <div className={styles.container}>
          <WinnerSelection />
          <ResultSelection />
          <RunDateSelection />
        </div>
        <AddResultButton />
      </SectionContainer>
    </WheelContextProvider>
  );
};

export default WheelRun;

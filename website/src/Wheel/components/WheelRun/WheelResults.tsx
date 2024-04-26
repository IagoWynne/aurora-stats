import { createUseStyles } from "react-jss";
import { WheelContextProvider } from "../../contexts/WheelContext";
import { SectionContainer } from "../../../Common";
import WheelResultsTable from "../WheelStats/WheelResultsTable";
import PeopleWheel from "./PeopleWheel";
import AddResultForm from "./AddResultForm";

const useStyles = createUseStyles({
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

const WheelResults = (): JSX.Element => {
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
        <p className={styles.title}>Add Wheel Result</p>
        <AddResultForm />
      </SectionContainer>
      <SectionContainer>
        <p className={styles.title}>Recent Runs</p>
        <WheelResultsTable />
      </SectionContainer>
    </WheelContextProvider>
  );
};

export default WheelResults;

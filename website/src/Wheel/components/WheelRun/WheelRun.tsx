import { createUseStyles } from "react-jss";
import { WheelContextProvider } from "../../contexts/WheelContext";
import WinnerSelection from "./WinnerSelection";
import OptionSelection from "./OptionSelection";
import AddRunButton from "./AddRunButton";
import { SectionContainer } from "../../../Common";

const useStyles = createUseStyles({
  container: {
    padding: "0 0 1rem 0",
    display: "flex",
    justifyContent: "flex-start",
    "& > div + div": {
      marginLeft: "1rem",
    }
  },
  title: {
    margin: 0
  }
});

const WheelRun = (): JSX.Element => {
  const styles = useStyles();

  return (
    <WheelContextProvider>
      <SectionContainer>
        <p className={styles.title}>
          <b>Add Wheel Result</b>
        </p>
        <div className={styles.container}>
          <WinnerSelection />
          <OptionSelection />
        </div>
        <AddRunButton />
      </SectionContainer>
    </WheelContextProvider>
  );
};

export default WheelRun;

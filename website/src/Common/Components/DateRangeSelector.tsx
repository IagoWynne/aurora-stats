import { createUseStyles } from "react-jss";
import DateInput from "./DateInput";

const useStyles = createUseStyles({
  container: {
    display: "flex",
    justifyContent: "space-evenly",
    marginLeft: "-22px",
    "& > div": {
      width: "45%",
    },
  },
});

interface Props {
  from: Date;
  to: Date;
  fromChanged: (date: Date) => void;
  toChanged: (date: Date) => void;
}

const DateRangeSelector = ({
  from,
  to,
  fromChanged,
  toChanged,
}: Props): JSX.Element => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <div>
        <DateInput
          id="from"
          label="From"
          onChange={(event) => fromChanged(new Date(event.target.value))}
          value={from}
        />
      </div>
      <div>
        <DateInput
          id="to"
          label="To"
          onChange={(event) => toChanged(new Date(event.target.value))}
          value={to}
        />
      </div>
    </div>
  );
};

export default DateRangeSelector;

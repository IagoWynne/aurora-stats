import DateInput from "./DateInput";

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
  return (
    <div>
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

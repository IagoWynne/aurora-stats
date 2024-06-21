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
    <div className="flex justify-between">
      <div className="basis-1/2 px-2">
        <DateInput
          id="from"
          label="From"
          onChange={(event) => fromChanged(new Date(event.target.value))}
          value={from}
          inlineLabel
        />
      </div>
      <div className="basis-1/2 px-2">
        <DateInput
          id="to"
          label="To"
          onChange={(event) => toChanged(new Date(event.target.value))}
          value={to}
          inlineLabel
        />
      </div>
    </div>
  );
};

export default DateRangeSelector;

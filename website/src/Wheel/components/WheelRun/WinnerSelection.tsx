import { createUseStyles } from "react-jss";
import { PersonType } from "../../../types";
import { useWheelContext } from "../../contexts/WheelContext";
import { AURORA_LIGHT_GREEN } from "../../../Colours";
import { Select } from "../../../Common";

const useStyles = createUseStyles({
  selected: {
    background: AURORA_LIGHT_GREEN,
  },
  title: {
    margin: 0,
    marginBottom: "3px",
  },
});

const WinnerSelection = (): JSX.Element => {
  const { people, winnerId, setWinnerId } = useWheelContext();
  const options = people.map((person: PersonType) => ({
    id: person.id,
    label: `${person.firstName} ${person.lastName}`,
  }));
  const styles = useStyles();

  return (
    <div>
      <Select
        id="winner"
        options={options}
        label="Winner"
        showLabel
        onChange={(event) => setWinnerId(Number(event.target.value))}
        selectedId={winnerId}
      />
    </div>
  );
};

export default WinnerSelection;

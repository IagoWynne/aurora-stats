import { useState } from "react";
import { useQuery } from "@apollo/client";
import { WheelOptionType } from "../../types";
import AddWheelOption from "./AddWheelOption";
import { GET_WHEEL_OPTIONS_QUERY } from "../queries";
import { createUseStyles } from "react-jss";
import { AURORA_LIGHT_GREEN, AURORA_LIGHT_HOVER } from "../../COLOURS";

const useStyles = createUseStyles({
  addButton: {
    background: AURORA_LIGHT_GREEN,
    border: "none",
    height: "30px",
    lineHeight: "30px",
    borderRadius: "3px",
    margin: "0 auto",
    marginTop: "5px",
    padding: "0 1rem",
    cursor: "pointer",
    "&:hover": {
        background: AURORA_LIGHT_HOVER
    }
  },
});

const WheelOptions = (): JSX.Element => {
  const { loading, error, data } = useQuery(GET_WHEEL_OPTIONS_QUERY);
  const [addingOption, setAddingOption] = useState(false);

  const styles = useStyles();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error! {error.message}</div>;
  }

  return (
    <div>
      {data.wheelOptions.map((option: WheelOptionType) => (
        <div key={option.id}>{option.name}</div>
      ))}
      {!addingOption && (
        <button
          className={styles.addButton}
          onClick={() => setAddingOption(true)}
        >
          Add Option
        </button>
      )}
      {addingOption && (
        <AddWheelOption onSuccess={() => setAddingOption(false)} />
      )}
    </div>
  );
};

export default WheelOptions;

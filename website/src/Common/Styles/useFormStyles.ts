import { createUseStyles } from "react-jss";
import { AURORA_LIGHT_GREEN, AURORA_LIGHT_HOVER } from "../../COLOURS";

const useFormStyles = createUseStyles({
  form: {
    "& label": {
      margin: "0 5px 0 0",
    },
  },
  input: {
    border: "none",
    borderBottom: "1px solid black",
    width: "100px",
  },
  submitButton: {
    background: AURORA_LIGHT_GREEN,
    border: "none",
    fontWeight: "bold",
    width: "24px",
    height: "24px",
    margin: "0 auto",
    padding: 0,
    textAlign: "center",
    lineHeight: "24px",
    borderRadius: "3px",
    cursor: "pointer",
    "&:hover": {
      background: AURORA_LIGHT_HOVER,
    },
  },
});

export default useFormStyles;

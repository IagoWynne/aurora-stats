import React, { PropsWithChildren } from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  container: {
    border: "1px solid black",
    background: "white",
    borderRadius: "5px",
    padding: "1rem",
    marginBottom: "1rem"
  },
});

const SectionContainer = ({ children }: PropsWithChildren): JSX.Element => {
  const styles = useStyles();
  return <div className={styles.container}>{children}</div>;
};

export default SectionContainer;

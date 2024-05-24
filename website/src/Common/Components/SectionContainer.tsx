import React, { PropsWithChildren } from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  container: {
    border: "1px solid black",
    background: "white",
    padding: "1rem",
    marginBottom: "1rem",
  },
  title: {
    margin: 0,
    fontWeight: "bold",
    paddingBottom: "1rem",
  },
});

interface Props extends PropsWithChildren {
  title?: string;
}

const SectionContainer = ({ title, children }: Props): JSX.Element => {
  const styles = useStyles();
  return (
    <div className={styles.container}>
      {title && <p className={styles.title}>{title}</p>}
      {children}
    </div>
  );
};

export default SectionContainer;

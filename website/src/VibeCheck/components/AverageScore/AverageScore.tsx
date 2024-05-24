import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  averageBox: {
    width: "100%",
    height: "calc(100% - 36px)",
    fontSize: "50px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  veryGood: {
    backgroundColor: "green",
  },
  good: {
    backgroundColor: "greenyellow",
  },
  ok: {
    backgroundColor: "yellow",
  },
  meh: {
    backgroundColor: "orange",
  },
  veryBad: {
    backgroundColor: "red",
  },
});

interface Props {
  score: number | null;
}

const AverageScore = ({ score }: Props): JSX.Element => {
  const styles = useStyles();

  const getBackgroundColour = (): string => {
    if (!score) {
      return "";
    }
    if (score > 9) {
      return styles.veryGood;
    }

    if (score > 7) {
      return styles.good;
    }

    if (score > 5) {
      return styles.ok;
    }

    if (score > 3) {
      return styles.meh;
    }

    return styles.veryBad;
  };

  return (
    <div className={`${styles.averageBox} ${getBackgroundColour()}`}>
      {score ? score.toFixed(2) : "-"}
    </div>
  );
};

export default AverageScore;

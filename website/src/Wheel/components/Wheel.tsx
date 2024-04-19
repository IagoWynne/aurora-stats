import { useQuery } from "@apollo/client";
import { GET_LAST_WEEK_WHEEL_WINS } from "../queries/getWheelWins";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  winSpan: {
    marginRight: "1rem",
  },
});

const Wheel = (): JSX.Element => {
  const styles = useStyles();

  const { loading, error, data } = useQuery(GET_LAST_WEEK_WHEEL_WINS, {
    variables: { from: "2024-04-18" },
  });
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error! {error.message}</div>;
  }
  return (
    <div>
      {data.wheelWins.map((win: any) => (
        <div key={win.id}>
          <span className={styles.winSpan}>{win.date}</span>
          <span className={styles.winSpan}>
            {win.winner.firstName} {win.winner.lastName}
          </span>
          <span>{win.result.name}</span>
        </div>
      ))}
    </div>
  );
};

export default Wheel;

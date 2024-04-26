import { useQuery } from "@apollo/client";
import { GET_WHEEL_RESULTS_BETWEEN } from "../../queries/getWheelResults";
import { PersonType } from "../../../types";
import { formatDate, subDays } from "date-fns";
import { createUseStyles } from "react-jss";
import { useWheelStatsContext } from "../../contexts/WheelStatsContext";

const useStyles = createUseStyles({
  resultsTable: {
    width: "100%",
    "& td": {
      textAlign: "center",
    },
    "& thead": {
      background: "#f0f0f0",
    },
    "& tbody": {
      "& tr:nth-child(even)": {
        background: "#f0f0f0",
      },
    },
  },
  dateCell: {
    width: "105px",
  },
  resultCell: {
    width: "105px",
  },
});

const WheelResultsTable = (): JSX.Element => {
  const styles = useStyles();
  const { results } = useWheelStatsContext();

  const items = results.map((result) => ({
    id: result.id,
    date: new Date(result.date),
    winner: `${result.winner.firstName} ${result.winner.lastName}`,
    prize: result.prize.name,
  }));

  return (
    <table className={styles.resultsTable}>
      <thead>
        <tr>
          <th className={styles.dateCell}>Date</th>
          <th>Winner</th>
          <th className={styles.resultCell}>Prize</th>
        </tr>
      </thead>
      <tbody>
        {items.map(
          (result: {
            id: number;
            date: Date;
            winner: string;
            prize: string;
          }) => (
            <tr key={result.id}>
              <td className={styles.dateCell}>
                {formatDate(result.date, "dd-MM-yyyy")}
              </td>
              <td>{result.winner}</td>
              <td className={styles.resultCell}>{result.prize}</td>
            </tr>
          )
        )}
      </tbody>
    </table>
  );
};

export default WheelResultsTable;

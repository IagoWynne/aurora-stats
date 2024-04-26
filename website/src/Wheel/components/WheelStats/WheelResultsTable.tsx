import { useQuery } from "@apollo/client";
import { GET_WHEEL_RESULTS_BETWEEN } from "../../queries/getWheelResults";
import { PersonType } from "../../../types";
import { formatDate, subDays } from "date-fns";
import { createUseStyles } from "react-jss";

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

interface Props {
  from?: Date;
  to?: Date;
}

const WheelResultsTable = ({ from, to }: Props): JSX.Element => {
  const styles = useStyles();

  // TODO - these dates should probably be passed in as props
  const now = Date.now();

  const { loading, error, data } = useQuery(GET_WHEEL_RESULTS_BETWEEN, {
    variables: {
      from: `${formatDate(from || new Date(subDays(now, 14)), "yyyy-MM-dd")}`,
      to: `${formatDate(to || now, "yyyy-MM-dd")}`,
    },
  });

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error! {error.message}</div>;
  }

  const results = data.wheelResults.map(
    (result: {
      id: number;
      date: string;
      winner: PersonType;
      prize: { name: string };
    }) => ({
      id: result.id,
      date: new Date(result.date),
      winner: `${result.winner.firstName} ${result.winner.lastName}`,
      prize: result.prize.name,
    })
  );

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
        {results.map(
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

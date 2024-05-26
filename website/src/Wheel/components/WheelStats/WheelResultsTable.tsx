import { formatDate } from "date-fns";
import { useWheelStatsContext } from "../../contexts/WheelStatsContext";

const WheelResultsTable = (): JSX.Element => {
  const { results } = useWheelStatsContext();

  const items = results.map((result) => ({
    id: result.id,
    date: new Date(result.date),
    winner: `${result.winner.firstName} ${result.winner.lastName}`,
    prize: result.prize.name,
  }));

  return (
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Winner</th>
          <th>Prize</th>
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
              <td>{formatDate(result.date, "dd-MM-yyyy")}</td>
              <td>{result.winner}</td>
              <td>{result.prize}</td>
            </tr>
          ),
        )}
      </tbody>
    </table>
  );
};

export default WheelResultsTable;

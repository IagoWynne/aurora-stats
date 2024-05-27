import { formatDate } from "date-fns";
import { useWheelStatsContext } from "../../contexts/WheelStatsContext";
import { Link } from "react-router-dom";

interface Props {
  showFullStatsButton?: boolean;
}

const WheelResultsTable = ({
  showFullStatsButton = false,
}: Props): JSX.Element => {
  const { results } = useWheelStatsContext();

  const items = results.map((result) => ({
    id: result.id,
    date: new Date(result.date),
    winner: `${result.winner.firstName} ${result.winner.lastName}`,
    prize: result.prize.name,
  }));

  return (
    <>
      <div className="pb-2 m-2">
        <table className="w-full table-fixed text-center alternating-rows">
          <thead>
            <tr>
              <th className="w-1/6">Date</th>
              <th>Winner</th>
              <th className="w-1/6">Prize</th>
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
              )
            )}
          </tbody>
        </table>
      </div>
      {showFullStatsButton && (
        <div className="m-2">
          <Link
            to="/wheel/stats"
            className="button p-2 inline-block text-center"
          >
            View Full Stats
          </Link>
        </div>
      )}
    </>
  );
};

export default WheelResultsTable;

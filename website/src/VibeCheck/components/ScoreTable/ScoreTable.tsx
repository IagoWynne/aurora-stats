import { createUseStyles } from "react-jss";
import { formatDate } from "date-fns";
import { useVibeCheckContext } from "../../contexts/VibeCheckContext";
import { VibeCheck } from "../../types";
import PersonCell from "./PersonCell";

const useStyles = createUseStyles({
  table: {
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
});

interface Props {
  vibeChecks: VibeCheck[];
}

const ScoreTable = ({ vibeChecks }: Props): JSX.Element => {
  const { people } = useVibeCheckContext();
  const styles = useStyles();

  const formatVibeCheckDate = (date: string) =>
    formatDate(new Date(date), "dd/MM/yyyy");

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Date</th>
          {people.map((person) => (
            <th key={person.id}>{person.firstName}</th>
          ))}
          <th>Average</th>
        </tr>
      </thead>
      <tbody>
        {vibeChecks.map((vibeCheck) => (
          <tr key={vibeCheck.date}>
            <td>{formatVibeCheckDate(vibeCheck.date)}</td>
            {people.map((person) => (
              <PersonCell
                key={person.id}
                scores={vibeCheck.scores}
                personId={person.id}
              />
            ))}
            <td>{vibeCheck.averageScore.toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ScoreTable;

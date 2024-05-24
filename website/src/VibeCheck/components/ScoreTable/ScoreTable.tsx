import { createUseStyles } from "react-jss";
import { formatDate } from "date-fns";
import { useVibeCheckContext } from "../../contexts/VibeCheckContext";
import { VibeCheck } from "../../types";
import PersonCell from "./PersonCell";

const useStyles = createUseStyles({
  tableBody: {
    "& > * > td": {
      textAlign: "center",
    },
  },
});

interface Props {
  vibeChecks: VibeCheck[];
}

const ScoreTable = ({ vibeChecks }: Props): JSX.Element => {
  const { people } = useVibeCheckContext();
  const styles = useStyles();

  const formatVibeCheckDate = (date: string) => formatDate(new Date(date), "dd/MM/yyyy");

  return (
    <table>
      <thead>
        <tr>
          <th>Date</th>
          {people.map((person) => (
            <th key={person.id}>{person.firstName}</th>
          ))}
          <th>Average</th>
        </tr>
      </thead>
      <tbody className={styles.tableBody}>
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

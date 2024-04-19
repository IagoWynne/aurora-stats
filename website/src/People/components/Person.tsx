import { createUseStyles } from "react-jss";
import { PersonType } from "../../types";

interface Props {
  person: PersonType;
}

const useStyles = createUseStyles({
  person: {
    paddingBottom: 5,
  },
});

const Person = ({ person }: Props): JSX.Element => {
  const styles = useStyles();
  return (
    <div className={styles.person}>
      {person.firstName} {person.lastName}
    </div>
  );
};

export default Person;

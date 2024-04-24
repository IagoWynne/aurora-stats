import { useQuery } from "@apollo/client";
import { GET_PEOPLE_QUERY } from "../queries";
import Person from "./Person";
import { PersonType } from "../../types";
import NewPerson from "./NewPerson";
import { SectionContainer } from "../../Common";

interface Props {}

const People = ({}: Props): JSX.Element => {
  const { loading, error, data } = useQuery(GET_PEOPLE_QUERY);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading people: {error.message}</div>;
  }

  return (
    <SectionContainer>
      {data &&
        data.people.map((person: PersonType) => (
          <Person key={person.id} person={person} />
        ))}
      <NewPerson />
    </SectionContainer>
  );
};

export default People;

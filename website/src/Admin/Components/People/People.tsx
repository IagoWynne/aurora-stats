import { useQuery, useSuspenseQuery } from "@apollo/client";
import { GET_PEOPLE_QUERY } from "../../queries";
import Person from "./Person";
import { PersonType } from "../../../types";
import NewPerson from "./NewPerson";

const People = (): JSX.Element => {
  const { data } = useSuspenseQuery(GET_PEOPLE_QUERY);

  return (
    <>
      {data &&
        (data as any).people.map((person: PersonType) => (
          <Person key={person.id} person={person} />
        ))}
      <NewPerson />
    </>
  );
};

export default People;

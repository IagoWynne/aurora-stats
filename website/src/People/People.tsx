import React from "react";
import { useQuery } from "@apollo/client";
import GET_PEOPLE_QUERY from "./queries/getPeople";

interface Props {}

const People = ({}: Props): JSX.Element => {
  const { data } = useQuery(GET_PEOPLE_QUERY);

  return (
    <div>
      {data &&
        data.people.map(
          (person: { id: string; firstName: string; lastName: string }) => (
            <div key={person.id}>
              {person.firstName} {person.lastName}
            </div>
          )
        )}
    </div>
  );
};

export default People;

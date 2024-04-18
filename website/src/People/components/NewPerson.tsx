import { useMutation } from "@apollo/client";
import React from "react";
import ADD_PERSON_MUTATION from "../queries/addPerson";
import GET_PEOPLE_QUERY from "../queries/getPeople";

const NewPerson = (): JSX.Element => {
  const [addPerson, { loading, error }] =
    useMutation(ADD_PERSON_MUTATION, {refetchQueries: [{query: GET_PEOPLE_QUERY}]});

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const target = event.target as typeof event.target & {
      firstName: { value: string };
      lastName: { value: string };
    };

    addPerson({
      variables: {
        firstName: target.firstName.value,
        lastName: target.lastName.value,
      },
    });
  };

  if (loading) {
    return <div>Submitting...</div>;
  }

  if (error) {
    return <div>Submission Error! {error.message}</div>;
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label>
          <input type="text" name="firstName" placeholder="First Name" />
        </label>
        <label>
          <input type="text" name="lastName" placeholder="Last Name" />
        </label>
        <button type="submit">+</button>
      </form>
    </div>
  );
};

export default NewPerson;

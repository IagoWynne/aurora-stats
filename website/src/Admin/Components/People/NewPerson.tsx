import { useMutation } from "@apollo/client";
import React from "react";
import { ADD_PERSON_MUTATION, GET_PEOPLE_QUERY } from "../../queries";
import { Button } from "../../../Common";

const NewPerson = (): JSX.Element => {
  const [addPerson, { loading, error }] = useMutation(ADD_PERSON_MUTATION, {
    refetchQueries: [{ query: GET_PEOPLE_QUERY }],
  });

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
    <form onSubmit={onSubmit}>
      <label>
        <input type="text" name="firstName" placeholder="First Name" required className="border-b-[1px] border-slate-800 p-2 mr-2"/>
      </label>
      <label>
        <input type="text" name="lastName" placeholder="Last Name" required className="border-b-[1px] border-slate-800 p-2"/>
      </label>
      <Button type="submit" className="w-10 ml-2">+</Button>
    </form>
  );
};

export default NewPerson;

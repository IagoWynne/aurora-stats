import { useMutation } from "@apollo/client";
import React from "react";
import { ADD_PERSON_MUTATION, GET_PEOPLE_QUERY } from "../queries";
import useFormStyles from "../../Common/Styles/useFormStyles";

const NewPerson = (): JSX.Element => {
  const [addPerson, { loading, error }] = useMutation(ADD_PERSON_MUTATION, {
    refetchQueries: [{ query: GET_PEOPLE_QUERY }],
  });

  const styles = useFormStyles();

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
    <form onSubmit={onSubmit} className={styles.form}>
      <label>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          className={styles.input}
          required
        />
      </label>
      <label>
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          className={styles.input}
          required
        />
      </label>
      <button type="submit" className={styles.submitButton}>
        +
      </button>
    </form>
  );
};

export default NewPerson;

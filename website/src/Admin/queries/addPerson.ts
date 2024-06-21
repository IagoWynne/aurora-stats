import { gql } from "@apollo/client";

const ADD_PERSON_MUTATION = gql`
  mutation CreatePerson($firstName: String!, $lastName: String!) {
    createPerson(firstName: $firstName, lastName: $lastName) {
      id
    }
  }
`;

export default ADD_PERSON_MUTATION;

import { gql } from "@apollo/client";

const GET_PEOPLE_QUERY = gql`
  query {
    people {
      id
      firstName
      lastName
    }
  }
`;

export default GET_PEOPLE_QUERY;

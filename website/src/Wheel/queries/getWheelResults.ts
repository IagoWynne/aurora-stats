import { gql } from "@apollo/client";

const GET_WHEEL_RESULTS_BETWEEN = gql`
  query GetWheelResultsBetween($from: String!, $to: String!) {
    wheelResults(from: $from, to: $to) {
      id
      date
      winner {
        id
        firstName
        lastName
      }
      prize {
        id
        name
      }
    }
  }
`;

export { GET_WHEEL_RESULTS_BETWEEN };

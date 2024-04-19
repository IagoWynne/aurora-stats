import { gql } from "@apollo/client";

const GET_LAST_WEEK_WHEEL_WINS = gql`
  query GetLastWeekWheelRuns($from: String!) {
    wheelWins(from: $from) {
      id
      date
      winner {
        id
        firstName
        lastName
      }
      result {
        id
        name
      }
    }
  }
`;

export { GET_LAST_WEEK_WHEEL_WINS };

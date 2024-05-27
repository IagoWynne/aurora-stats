import { gql } from "@apollo/client";

const GET_VIBE_CHECK_BETWEEN = gql`
  query GetVibeCheckBetween($from: Time!, $to: Time!) {
    vibeChecks(from: $from, to: $to) {
      date
      scores {
        person {
          id
        }
        score
      }
      averageScore
    }
  }
`;

export { GET_VIBE_CHECK_BETWEEN };

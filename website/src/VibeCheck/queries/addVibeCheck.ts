import { gql } from "@apollo/client";

const ADD_VIBE_CHECK_MUTATION = gql`
  mutation AddVibeCheck($date: Time!, $scores: [VibeCheckInputScore!]!) {
    addVibeCheck(date: $date, scores: $scores)
  }
`;

export default ADD_VIBE_CHECK_MUTATION;

import { gql } from "@apollo/client";

const GET_WHEEL_OPTIONS_QUERY = gql`
  query GetWheelOptions {
    wheelOptions {
      id
      name
    }
  }
`;

export default GET_WHEEL_OPTIONS_QUERY;
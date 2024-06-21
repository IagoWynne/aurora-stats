import { gql } from "@apollo/client";

const GET_WHEEL_OPTIONS_AND_PEOPLE_QUERY = gql`
  query GetWheelOptionsAndPeople {
    wheelOptions {
      id
      name
    }
    people {
      id
      firstName
      lastName
    }
  }
`;

export { GET_WHEEL_OPTIONS_AND_PEOPLE_QUERY };

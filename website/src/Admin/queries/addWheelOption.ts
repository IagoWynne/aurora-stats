import { gql } from "@apollo/client";

const ADD_WHEEL_OPTION_MUTATION = gql`
  mutation AddWheelOption($name: String!) {
    addWheelOption(name: $name) {
      id
    }
  }
`;

export default ADD_WHEEL_OPTION_MUTATION;

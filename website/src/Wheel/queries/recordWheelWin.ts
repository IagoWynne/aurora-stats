import { gql } from "@apollo/client";

const RECORD_WHEEL_WIN_MUTATION = gql`
  mutation RecordWheelWin($date: Time!, $winnerId: Int!, $resultId: Int!) {
    addWheelRun(date: $date, winnerId: $winnerId, resultId: $resultId) {
      id
    }
  }
`;

export default RECORD_WHEEL_WIN_MUTATION;

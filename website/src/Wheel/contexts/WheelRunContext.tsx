import { PropsWithChildren, createContext, useContext } from "react";
import { useMutation } from "@apollo/client";
import {
  RECORD_WHEEL_WIN_MUTATION,
  GET_WHEEL_RESULTS_BETWEEN,
} from "../queries";
import { formatDate, subDays } from "date-fns";

export interface WheelRunState {
  runDate: Date;
  recordWheelWin: (date: Date, winnerId: number, resultId: number) => void;
}

const WheelRunContext = createContext<WheelRunState | undefined>(undefined);

export const WheelRunContextProvider: (
  props: PropsWithChildren
) => JSX.Element = ({ children }: PropsWithChildren) => {
  const [addWheelWin, { loading: addResultLoading, error: addResultError }] =
    useMutation(RECORD_WHEEL_WIN_MUTATION, {
      refetchQueries: [
        {
          query: GET_WHEEL_RESULTS_BETWEEN,
          variables: {
            from: formatDate(new Date(subDays(new Date(), 14)), "yyyy-MM-dd"),
            to: formatDate(new Date(), "yyyy-MM-dd"),
          },
        },
      ],
    });
  const runDate = new Date();

  const recordWheelWin = async (
    date: Date,
    winnerId: number,
    resultId: number
  ) =>
    await addWheelWin({
      variables: { date: formatDate(date, "yyyy-MM-dd"), winnerId, resultId },
    });

  if (addResultLoading) {
    return <p>Loading...</p>;
  }

  if (addResultError) {
    return <p>Error!</p>;
  }

  return (
    <WheelRunContext.Provider
      value={{
        runDate,
        recordWheelWin,
      }}
    >
      {children}
    </WheelRunContext.Provider>
  );
};

export const useWheelRunContext = () => {
  const context = useContext(WheelRunContext);
  if (context === undefined) {
    throw new Error(
      "useWheelRunContext must be rendered in a tree within a WheelRunContextProvider"
    );
  }
  return context;
};

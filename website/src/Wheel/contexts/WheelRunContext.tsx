import { PropsWithChildren, createContext, useContext, useState } from "react";
import { WheelOptionType, PersonType } from "../../types";
import { useMutation, useQuery } from "@apollo/client";
import {
  GET_WHEEL_OPTIONS_AND_PEOPLE_QUERY,
  RECORD_WHEEL_WIN_MUTATION,
  GET_WHEEL_RESULTS_BETWEEN,
} from "../queries";
import { formatDate, subDays } from "date-fns";

export interface WheelRunState {
  wheelOptions: WheelOptionType[];
  people: PersonType[];
  runDate: Date;
  recordWheelWin: (date: Date, winnerId: number, resultId: number) => void;
}

const WheelRunContext = createContext<WheelRunState | undefined>(undefined);

export const WheelRunContextProvider: (
  props: PropsWithChildren
) => JSX.Element = ({ children }: PropsWithChildren) => {
  const {
    loading: dataLoading,
    error: dataError,
    data,
  } = useQuery(GET_WHEEL_OPTIONS_AND_PEOPLE_QUERY);
  const [addWheelWin, { loading: addWheelLoading, error: addWheelError }] =
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

  if (dataLoading || addWheelLoading) {
    return <p>Loading...</p>;
  }

  if (dataError || addWheelError) {
    return <p>Error!</p>;
  }

  return (
    <WheelRunContext.Provider
      value={{
        wheelOptions: data.wheelOptions,
        people: data.people,
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
      "useWheelContext must be rendered in a tree within a WheelContextProvider"
    );
  }
  return context;
};

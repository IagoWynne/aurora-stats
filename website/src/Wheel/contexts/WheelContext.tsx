import { PropsWithChildren, createContext, useContext, useState } from "react";
import { WheelOptionType, PersonType } from "../../types";
import { useMutation, useQuery } from "@apollo/client";
import {
  GET_WHEEL_OPTIONS_AND_PEOPLE_QUERY,
  RECORD_WHEEL_WIN_MUTATION,
  GET_WHEEL_RESULTS_BETWEEN,
} from "../queries";
import { formatDate, subDays } from "date-fns";

export interface WheelState {
  wheelOptions: WheelOptionType[];
  people: PersonType[];
  winnerId: number | null;
  resultId: number | null;
  runDate: Date;
  setWinnerId: (id: number) => void;
  setResultId: (id: number) => void;
  setRunDate: (date: Date) => void;
  recordWheelWin: () => void;
}

const WheelContext = createContext<WheelState | undefined>(undefined);

export const WheelContextProvider: (
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
  const [winnerId, setWinnerId] = useState<number | null>(null);
  const [resultId, setResultId] = useState<number | null>(null);
  const [runDate, setRunDate] = useState(new Date());

  const recordWheelWin = async () => {
    if (winnerId && resultId) {
      await addWheelWin({
        variables: {
          date: formatDate(runDate, "yyyy-MM-dd"),
          winnerId,
          resultId,
        },
      });

      setWinnerId(null);
      setResultId(null);
    }
  };

  if (dataLoading || addWheelLoading) {
    return <p>Loading...</p>;
  }

  if (dataError || addWheelError) {
    return <p>Error!</p>;
  }

  return (
    <WheelContext.Provider
      value={{
        wheelOptions: data.wheelOptions,
        people: data.people,
        winnerId,
        resultId,
        runDate,
        setWinnerId,
        setResultId,
        setRunDate,
        recordWheelWin,
      }}
    >
      {children}
    </WheelContext.Provider>
  );
};

export const useWheelContext = () => {
  const context = useContext(WheelContext);
  if (context === undefined) {
    throw new Error(
      "useWheelContext must be rendered in a tree within a WheelContextProvider"
    );
  }
  return context;
};

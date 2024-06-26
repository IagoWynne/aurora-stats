import { PropsWithChildren, createContext, useContext, useState } from "react";
import { WheelResultType } from "../../types";
import { subDays } from "date-fns";
import { useQuery } from "@apollo/client";
import { GET_WHEEL_RESULTS_BETWEEN } from "../queries";

export interface WheelStatsState {
  from: Date;
  to: Date;
  setFrom: (date: Date) => void;
  setTo: (date: Date) => void;
  results: WheelResultType[];
}

const WheelStatsContext = createContext<WheelStatsState | undefined>(undefined);

export const WheelStatsContextProvider: (
  props: PropsWithChildren<{}>,
) => JSX.Element = ({ children }: PropsWithChildren) => {
  const [to, setTo] = useState(new Date());
  const [from, setFrom] = useState(new Date(subDays(to, 28)));

  const { loading, error, data } = useQuery(GET_WHEEL_RESULTS_BETWEEN, {
    variables: {
      from: from.toISOString(),
      to: to.toISOString(),
    },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error...</div>;
  }

  return (
    <WheelStatsContext.Provider
      value={{
        from,
        to,
        setFrom,
        setTo,
        results: data.wheelResults,
      }}
    >
      {children}
    </WheelStatsContext.Provider>
  );
};

export const useWheelStatsContext = () => {
  const context = useContext(WheelStatsContext);
  if (context === undefined) {
    throw new Error(
      "useWheelStatsContext must be used within a WheelStatsContextProvider",
    );
  }
  return context;
};

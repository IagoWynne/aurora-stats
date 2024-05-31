import { PropsWithChildren, createContext, useContext } from "react";
import { VibeCheck, VibeCheckWeek } from "../types";
import useVibeChecksQuery from "../hooks/useVibeChecksQuery";

interface Props {
  from: Date;
  to: Date;
}

export interface VibeCheckStatsState {
  vibeCheckWeeks: VibeCheckWeek[];
  vibeChecks: VibeCheck[];
  from: Date;
  to: Date;
}

const VibeCheckStatsContext = createContext<VibeCheckStatsState | undefined>(
  undefined
);

export const VibeCheckStatsContextProvider: (
  props: PropsWithChildren<Props>
) => JSX.Element = ({
  to,
  from,
  children,
}: PropsWithChildren<Props>): JSX.Element => {
  const { vibeChecks, vibeCheckWeeks } = useVibeChecksQuery(from, to);

  return (
    <VibeCheckStatsContext.Provider
      value={{
        from,
        to,
        vibeChecks,
        vibeCheckWeeks,
      }}
    >
      {children}
    </VibeCheckStatsContext.Provider>
  );
};

export const useVibeCheckStatsContext = (): VibeCheckStatsState => {
  const context = useContext(VibeCheckStatsContext);

  if (context === undefined) {
    throw new Error(
      "useVibeCheckStatsContext must be rendered in a tree within a VibeCheckStatsContextProvider"
    );
  }

  return context;
};

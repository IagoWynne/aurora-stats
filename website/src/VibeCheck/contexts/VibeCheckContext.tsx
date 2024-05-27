import { PropsWithChildren, createContext, useContext } from "react";
import { PersonType } from "../../types";
import { useSuspenseQuery } from "@apollo/client";
import GET_PEOPLE_QUERY from "../queries/getPeople";

export interface VibeCheckState {
  people: PersonType[];
}

const VibeCheckContext = createContext<VibeCheckState | undefined>(undefined);

export const VibeCheckContextProvider: (
  props: PropsWithChildren,
) => JSX.Element = ({ children }: PropsWithChildren) => {
  const { data } = useSuspenseQuery(GET_PEOPLE_QUERY);

  return (
    <VibeCheckContext.Provider value={{ people: (data as any).people }}>
      {children}
    </VibeCheckContext.Provider>
  );
};

export const useVibeCheckContext = () => {
  const context = useContext(VibeCheckContext);
  if (context === undefined) {
    throw new Error(
      "useVibeCheckContext must be rendered in a tree within a VibeCheckContextProvider",
    );
  }
  return context;
};

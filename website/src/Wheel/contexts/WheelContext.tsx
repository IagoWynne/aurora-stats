import { PropsWithChildren, createContext, useContext, useState } from "react";
import { WheelOptionType, PersonType } from "../../types";
import { useQuery } from "@apollo/client";
import {
  GET_WHEEL_OPTIONS_AND_PEOPLE_QUERY,
} from "../queries";

export interface WheelRunState {
  wheelOptions: WheelOptionType[];
  people: PersonType[];
}

const WheelContext = createContext<WheelRunState | undefined>(undefined);

export const WheelContextProvider: (
  props: PropsWithChildren
) => JSX.Element = ({ children }: PropsWithChildren) => {
  const { loading, error, data } = useQuery(GET_WHEEL_OPTIONS_AND_PEOPLE_QUERY);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error!</p>;
  }

  return (
    <WheelContext.Provider
      value={{
        wheelOptions: data.wheelOptions,
        people: data.people,
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

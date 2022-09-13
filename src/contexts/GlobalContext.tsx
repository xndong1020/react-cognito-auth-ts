/* eslint-disable */
import React, { createContext, memo, useState } from "react";

export interface IGlobalContext {
  loading: boolean;
  setLoadingStatus: (loading: boolean) => void;
}

const initGlobalContextValues: IGlobalContext = {
  loading: false,
  setLoadingStatus: (loading: boolean) => {},
};

export const GlobalContext = createContext<IGlobalContext>(
  initGlobalContextValues
);

export const GlobalContextProvider = memo(
  ({ children }: { children: any }): JSX.Element => {
    const setLoadingStatus = (loading: boolean) => {
      setState((prevState: IGlobalContext) => ({
        ...prevState,
        loading,
      }));
    };

    const [state, setState] = useState({
      loading: false,
      setLoadingStatus,
    } as IGlobalContext);

    return (
      <GlobalContext.Provider value={state}>{children}</GlobalContext.Provider>
    );
  }
);

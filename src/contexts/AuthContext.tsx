/* eslint-disable */
import React, { createContext, memo, useState } from "react";

export interface IApplicationUser {
  isAuthenticated: boolean;
  name?: string;
  uid?: string;
}

export interface IAuthContext {
  user: IApplicationUser;
  setUser: (user: IApplicationUser) => void;
}

const initGlobalContextValues: IAuthContext = {
  user: { isAuthenticated: false },
  setUser: (user: IApplicationUser) => {},
};

export const AuthContext = createContext<IAuthContext>(initGlobalContextValues);

export const AuthContextProvider = memo(
  ({ children }: { children: JSX.Element }): JSX.Element => {
    const setUser = (user: IApplicationUser) => {
      setState((prevState: IAuthContext) => ({
        ...prevState,
        user,
      }));
    };

    const [state, setState] = useState({
      user: { isAuthenticated: false },
      setUser,
    } as IAuthContext);

    return (
      <AuthContext.Provider value={state}>{children}</AuthContext.Provider>
    );
  }
);

import { reducer, Actions } from "./reducer";
import React, { createContext, useContext, useReducer } from "react";
export type InitialStateType = {
  provider?: any;
  web3Provider?: any;
  account?: string | null;
  chainId?: number | null;
};

const initialState: InitialStateType = {
  provider: null,
  web3Provider: null,
  account: null,
  chainId: null,
};

export const WalletContext = createContext<{
  state: InitialStateType;
  dispatch: React.Dispatch<Actions>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const WalletProvider: React.FC<{ children: React.ReactChild }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <WalletContext.Provider value={{ state, dispatch }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useAppContext = () => useContext(WalletContext);

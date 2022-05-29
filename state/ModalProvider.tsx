import React, { createContext, useContext, useReducer, useState } from "react";
export type InitialStateType = {
  provider?: any;
  web3Provider?: any;
  account?: string | null;
  chainId?: number | null;
};

export const ModalContext = createContext<{
  open: boolean;
  setOpen: (arg: boolean) => void;
}>({
  open: false,
  setOpen: (arg: boolean) => null,
});

export const ModalProvider: React.FC<{ children: React.ReactChild }> = ({
  children,
}) => {
  const [open, setOpen] = useState(false);
  return (
    <ModalContext.Provider value={{ open, setOpen }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);

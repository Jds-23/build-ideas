// import { BigNumber } from "ethers";
import { InitialStateType } from "./WalletProvider";
// import { getAmountIn, getAmountOut } from "../utils";
type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export enum ActionTypes {
  setWeb3Provider = "SET_WEB3_PROVIDER",
  setAddress = "SET_ADDRESS",
  setChainId = "SET_CHAIN_ID",
  resetWeb3Provider = "RESET_WEB3_PROVIDER",
  initialWeb3Provider = "INITIAL_WEB3_PROVIDER",
}

type Payload = {
  [ActionTypes.setWeb3Provider]: {
    provider: any;
    web3Provider: any;
    account: string;
    chainId: number;
  };
  [ActionTypes.initialWeb3Provider]: {
    web3Provider: any;
  };
  [ActionTypes.resetWeb3Provider]: {};
  [ActionTypes.setChainId]: {
    chainId: number;
  };
  [ActionTypes.setAddress]: {
    account: string;
  };
};

export type Actions = ActionMap<Payload>[keyof ActionMap<Payload>];

export const reducer = (state: InitialStateType, action: Actions) => {
  switch (action.type) {
    case "SET_WEB3_PROVIDER":
      return {
        ...state,
        provider: action.payload.provider,
        web3Provider: action.payload.web3Provider,
        account: action.payload.account,
        chainId: action.payload.chainId,
      };
    case "INITIAL_WEB3_PROVIDER":
      return {
        ...state,
        web3Provider: action.payload.web3Provider,
      };
    case "SET_ADDRESS":
      return {
        ...state,
        account: action.payload.account,
      };
    case "SET_CHAIN_ID":
      return {
        ...state,
        chainId: action.payload.chainId,
      };
    case "RESET_WEB3_PROVIDER":
      return {
        ...state,
        provider: null,
        web3Provider: null,
        account: null,
        chainId: null,
      };
    default:
      return state;
  }
};
import { ethers } from "ethers";
import Link from "next/link";
import React from "react";
import useWallet from "../../state/wallet/hooks/useWallet";
import { getEllipsisTxt } from "../../utils";
import Button from "../Button";

const Header = () => {
  const { account, connect, chainId, provider, web3Provider } = useWallet();
  return (
    <div className="fixed top-0 left-0 flex items-center justify-between w-full px-4 py-2 border-b z-10 bg-white border-b-strokes">
      <Link href="/">
        <span className="text-lg font-bold cursor-pointer text-accent">
          build_ideas
        </span>
      </Link>
      <button
        onClick={() => {
          if (!account) {
            connect();
          }
        }}
        className={`p-1.5 mx-1 ml-auto font-bold rounded-md justify-self-end ${
          account
            ? `bg-white-500 text-accent`
            : `text-white-500 text-white bg-accent `
        } border-solid border-2 border-accent 
          focus:outline-none`}
      >
        {account ? getEllipsisTxt(account) : "Connect Wallet"}
      </button>

      {chainId && chainId !== Number("0x4") && (
        <Button
          onClick={() => {
            if (chainId !== Number("0x4")) {
              provider?.request({
                method: "wallet_switchEthereumChain",
                params: [{ chainId: "0x4" }],
              });
            }
          }}
          className="bg-red-500 border-red-500 mr-1"
        >
          Switch To Rinkeby
        </Button>
      )}
    </div>
  );
};

export default Header;

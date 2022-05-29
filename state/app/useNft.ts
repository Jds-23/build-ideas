import { useCallback, useEffect, useState } from "react";
import useContract from "../../hooks/useContract";
import { JUST_NFT_ADDRESS } from "../../constants";

import NFT_ABI from "../../constants/abis/JustNFT.json";
import useWallet from "../wallet/hooks/useWallet";
import { BigNumber, Contract } from "ethers";

const useNft = () => {
  const nftContract = useContract(JUST_NFT_ADDRESS, NFT_ABI, true);
  const { account, web3Provider } = useWallet();
  const [minting, setMinting] = useState(false);
  const [balance, setBalance] = useState<BigNumber | undefined>(undefined);

  const getBalance = useCallback(async () => {
    if (nftContract && account) {
      const balance = await nftContract.balanceOf(account);
      setBalance(balance);
    } else {
      return;
    }
  }, [nftContract, account]);
  const mint = useCallback(async () => {
    if (account && web3Provider) {
      const signer = web3Provider.getSigner();
      const nftContract = new Contract(JUST_NFT_ADDRESS, NFT_ABI, signer);
      setMinting(true);
      const tx = await nftContract.mint(account);
      await tx.wait();
      console.log("Mined -- ", tx.hash);
      getBalance();
      setMinting(false);
    } else {
      return;
    }
  }, [account, web3Provider]);

  useEffect(() => {
    getBalance();
  }, [getBalance]);

  return { balance, mint, minting };
};

export default useNft;

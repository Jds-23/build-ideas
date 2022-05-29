import { IDEA_PORTAL_ADDRESS } from "../../constants";
import useContract from "../../hooks/useContract";
import useWallet from "../wallet/hooks/useWallet";
import IDEA_PORTAL_ABI from "../../constants/abis/IdeaPortal.json";
import { useCallback, useEffect, useState } from "react";
import { BigNumber, Contract } from "ethers";

const useApp = () => {
  const portalContract = useContract(IDEA_PORTAL_ADDRESS, IDEA_PORTAL_ABI);
  const [allWaves, setAllWaves] = useState<any[] | undefined>();
  const [minting, setMinting] = useState(false);
  const { account, web3Provider } = useWallet();

  const getAllWaves = useCallback(async () => {
    if (portalContract) {
      const waves = await portalContract.getAllWaves();
      let wavesCleaned: any[] = [];
      waves.forEach((wave: { waver: any; timestamp: number; message: any }) => {
        wavesCleaned.push({
          ideator: wave.waver,
          timestamp: new Date(wave.timestamp * 1000),
          idea: wave.message,
        });
      });
      setAllWaves(wavesCleaned);
    } else {
      return;
    }
  }, [portalContract]);

  const mint = useCallback(
    async (idea: string) => {
      if (account && web3Provider) {
        const signer = web3Provider.getSigner();
        const portalContract = new Contract(
          IDEA_PORTAL_ADDRESS,
          IDEA_PORTAL_ABI,
          signer
        );
        setMinting(true);
        const tx = await portalContract.wave(idea);
        await tx.wait();
        console.log("Mined -- ", tx.hash);
        getAllWaves();
        setMinting(false);
      } else {
        return;
      }
    },
    [account, web3Provider]
  );

  useEffect(() => {
    if (!allWaves) getAllWaves();
  }, [getAllWaves]);

  return { allWaves, mintingIdea: minting, mintIdea: mint };
};

export const useVote = (index: number) => {
  const { account, web3Provider } = useWallet();
  const portalContract = useContract(IDEA_PORTAL_ADDRESS, IDEA_PORTAL_ABI);
  const [voting, setVoting] = useState(false);
  const [upVotes, setUpVote] = useState<BigNumber | undefined>(undefined);
  const [downVotes, setDownVote] = useState<BigNumber | undefined>(undefined);

  const fetchVotes = useCallback(async () => {
    if (portalContract) {
      const up = await portalContract.up(index);
      const down = await portalContract.down(index);
      setUpVote(up);
      setDownVote(down);
    }
  }, [portalContract, index]);

  const upVote = useCallback(
    async (index: number) => {
      if (account && web3Provider) {
        const signer = web3Provider.getSigner();
        const portalContract = new Contract(
          IDEA_PORTAL_ADDRESS,
          IDEA_PORTAL_ABI,
          signer
        );
        setVoting(true);
        const tx = await portalContract.vote(index, 0);
        await tx.wait();
        console.log("Voted -- ", tx.hash);
        fetchVotes();
        setVoting(false);
      } else {
        return;
      }
    },
    [account, web3Provider]
  );
  const downVote = useCallback(
    async (index: number) => {
      if (account && web3Provider) {
        const signer = web3Provider.getSigner();
        const portalContract = new Contract(
          IDEA_PORTAL_ADDRESS,
          IDEA_PORTAL_ABI,
          signer
        );
        setVoting(true);
        const tx = await portalContract.vote(index, 1);
        await tx.wait();
        console.log("Voted -- ", tx.hash);
        fetchVotes();
        setVoting(false);
      } else {
        return;
      }
    },
    [account, web3Provider]
  );

  useEffect(() => {
    if (!upVotes) fetchVotes();
  }, [fetchVotes]);

  return { voting, upVotes, downVotes, upVote, downVote };
};

export default useApp;

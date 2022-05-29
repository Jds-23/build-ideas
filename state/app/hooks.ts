import { IDEA_PORTAL_ADDRESS } from "../../constants";
import useContract from "../../hooks/useContract";
import useWallet from "../wallet/hooks/useWallet";
import IDEA_PORTAL_ABI from "../../constants/abis/IdeaPortal.json";
import { useCallback, useEffect, useState } from "react";
import { BigNumber, Contract } from "ethers";
import useToast from "../../hooks/useToasts";

const useApp = () => {
  const portalContract = useContract(IDEA_PORTAL_ADDRESS, IDEA_PORTAL_ABI);
  const [allWaves, setAllWaves] = useState<any[] | undefined>();
  const [minting, setMinting] = useState(false);
  const { account, web3Provider } = useWallet();
  const { txSuccess, error, dismiss, txWaiting } = useToast();
  const getAllWaves = useCallback(async () => {
    if (portalContract) {
      const waves = await portalContract.getAllWaves();
      let wavesCleaned: any[] = [];
      let index = 0;
      waves.forEach((wave: { waver: any; timestamp: number; message: any }) => {
        // const res = await fetchVotes(index);
        index += 1;
        console.log(index);
        wavesCleaned.push({
          ideator: wave.waver,
          timestamp: new Date(wave.timestamp * 1000),
          idea: wave.message,
        });
        return;
      });
      setAllWaves(wavesCleaned);
    } else {
      return;
    }
  }, [portalContract]);

  const mint = useCallback(
    async (idea: string, metadata: string, deadline: string) => {
      if (account && web3Provider) {
        try {
          const signer = web3Provider.getSigner();
          const portalContract = new Contract(
            IDEA_PORTAL_ADDRESS,
            IDEA_PORTAL_ABI,
            signer
          );
          setMinting(true);
          const tx = await portalContract.wave(idea, deadline, metadata);
          txWaiting("Minting Idea...");
          await tx.wait();
          txSuccess("Idea Minted", tx.hash);
          dismiss();
          console.log("Mined -- ", tx.hash);
          getAllWaves();
        } catch (err) {
          console.log(err);
          error("Failed!");
        }
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
  const [votes, setVotes] = useState<
    | {
        voter: string;
        weight: BigNumber;
        type: BigNumber;
      }[]
    | undefined
  >(undefined);
  const [upVotes, setUpVote] = useState<
    | {
        voter: string;
        weight: BigNumber;
        type: BigNumber;
      }[]
    | undefined
  >(undefined);
  const [downVotes, setDownVote] = useState<
    | {
        voter: string;
        weight: BigNumber;
        type: BigNumber;
      }[]
    | undefined
  >(undefined);
  const { txSuccess, error, txWaiting, dismiss } = useToast();
  const fetchVotes = useCallback(async () => {
    if (portalContract) {
      const votes = await portalContract.getAllVotes(index);

      let votesCleaned: {
        voter: string;
        weight: BigNumber;
        type: BigNumber;
      }[] = [];
      votes.forEach((vote: { voter: any; weight: any; _type: any }) => {
        votesCleaned.push({
          voter: vote.voter,
          weight: vote.weight,
          type: vote._type,
        });
      });
      let upvotesCleaned: any[] = [];
      votesCleaned
        .filter((vote) => vote.type.isZero())
        .forEach(
          (vote: { voter: string; weight: BigNumber; type: BigNumber }) => {
            upvotesCleaned.push({
              voter: vote.voter,
              weight: vote.weight,
              type: vote.type,
            });
          }
        );
      let downvotesCleaned: {
        voter: string;
        weight: BigNumber;
        type: BigNumber;
      }[] = [];
      votesCleaned
        .filter((vote) => !vote.type.isZero())
        .forEach(
          (vote: { voter: string; weight: BigNumber; type: BigNumber }) => {
            downvotesCleaned.push({
              voter: vote.voter,
              weight: vote.weight,
              type: vote.type,
            });
          }
        );

      setVotes(votesCleaned);
      setUpVote(upvotesCleaned);
      setDownVote(downvotesCleaned);
    }
  }, [portalContract, index]);

  const upVote = useCallback(
    async (index: number) => {
      if (account && web3Provider) {
        try {
          const signer = web3Provider.getSigner();
          const portalContract = new Contract(
            IDEA_PORTAL_ADDRESS,
            IDEA_PORTAL_ABI,
            signer
          );
          setVoting(true);
          const tx = await portalContract.vote(index, 0);

          txWaiting("Casting your vote...");
          await tx.wait();

          txSuccess("Voted", tx.hash);

          dismiss();

          console.log("Voted -- ", tx.hash);
          fetchVotes();
        } catch (err) {
          console.log(err);
          error("Failed!");
        }
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
        try {
          const signer = web3Provider.getSigner();
          const portalContract = new Contract(
            IDEA_PORTAL_ADDRESS,
            IDEA_PORTAL_ABI,
            signer
          );
          setVoting(true);
          const tx = await portalContract.vote(index, 1);
          txWaiting("Casting your vote...");
          await tx.wait();

          txSuccess("Voted", tx.hash);

          dismiss();

          console.log("Voted -- ", tx.hash);
          fetchVotes();
        } catch (err) {
          console.log(err);
          error("Failed!");
        }
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

  return { voting, upVotes, votes, downVotes, upVote, downVote };
};

export default useApp;

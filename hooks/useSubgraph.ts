import { request } from "graphql-request";
import { stringify } from "querystring";
import useSWR from "swr";
import { retrieve } from "../utils/storeFile";
import isIPFS from "is-ipfs";
import { useEffect, useMemo, useState } from "react";
import { Subgraph } from "../constants";
import { getAddress } from "ethers/lib/utils";
const QUERY = `{
    ideas(first: 50) {
      id
      ideaStr
      metadata
      deadline
      from
      votesCount
      votes{
        id
        from
        weight
        type
      }
      upScore
      downScore
      timestamp
    }
  }`;

// @ts-ignore TYPE NEEDS FIXING
const fetcher = (query) => request(Subgraph, query);

export function useSubgraph(): {
  id: number;
  ideaStr: string;
  metadata: string;
  deadline: number;
  from: string;
  votesCount: number;
  votes: {
    id: string;
    from: string;
    weight: number;
    type: number;
  }[];
  upScore: number;
  score: number;
  downScore: number;
  timestamp: number;
}[] {
  const { data } = useSWR(QUERY, fetcher, { refreshInterval: 1000 });

  //   const [ipfsMetadata, setIpfsMetadata] = useState<{
  //     [key: string]: {
  //       about?: string;
  //       submissionLink?: string;
  //       title?: string;
  //     };
  //   }>({});
  return useMemo<
    {
      id: number;
      ideaStr: string;
      metadata: string;
      deadline: number;
      from: string;
      votesCount: number;
      votes: {
        id: string;
        from: string;
        weight: number;
        type: number;
      }[];
      upScore: number;
      score: number;
      downScore: number;
      timestamp: number;
    }[]
  >(() => {
    return (
      data?.ideas?.map((idea: any) => {
        const votes = idea.votes.map(
          (vote: {
            id: string;
            from: string;
            weight: number;
            type: number;
          }) => ({
            id: vote.id,
            from: getAddress(vote.from),
            weight: vote.weight,
            type: vote.type,
          })
        );

        return {
          id: idea.id,
          ideaStr: idea.ideaStr,
          votes,
          metadata: idea.metadata,
          deadline: idea.deadline,
          from: getAddress(idea.from),
          votesCount: idea.votesCount,
          upScore: idea.upScore,
          downScore: idea.downScore,
          score: idea.upScore - idea.downScore,
          timestamp: idea.timestamp,
        };
      }) ?? []
    );
  }, [data]);
}

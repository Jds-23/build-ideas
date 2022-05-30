import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import { useSubgraph } from "../../hooks/useSubgraph";
import { generatedNft, getEllipsisTxt, nFormatter } from "../../utils";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { retrieve } from "../../utils/storeFile";
import Button from "../../components/Button";
import { useVote } from "../../state/app/hooks";
import useWallet from "../../state/wallet/hooks/useWallet";

const Idea = () => {
  const router = useRouter();
  const { slug } = router.query;
  const data = useSubgraph();
  const theone = useMemo(
    () => data?.filter((idea) => idea.id.toString() == slug)[0],
    [data, slug]
  );
  const [metadata, setMetadata] = useState<any>();
  useEffect(() => {
    if (theone?.metadata) fetchMetadata(theone?.metadata);
  }, [theone]);
  const fetchMetadata = async (cid: string) => {
    const res = await retrieve(cid);
    console.log(res);
    setMetadata(res);
  };

  const upvote = useMemo(() => {
    if (typeof slug === "string") {
      // @ts-ignore
      return theone?.votes?.filter((vote) => vote.type == "0");
    }
  }, [theone, slug]);
  const downvote = useMemo(() => {
    if (typeof slug === "string") {
      // @ts-ignore
      return theone?.votes?.filter((vote) => vote.type == "1");
    }
  }, [theone, slug]);
  const index = useMemo(
    () => typeof slug === "string" && parseFloat(slug),
    [slug]
  );

  return (
    <div className="w-full px-4 mx-auto max-w-3xl flex flex-col items-center font-semibold">
      <div className="mt-1 w-full flex items-center justify-between">
        <p className="mb-2 text-xl">{theone?.ideaStr}</p>
        {index && <JustARow index={index} theone={theone} />}
      </div>
      <div className="w-full grid gap-2 sm:grid sm:grid-cols-2 sm:gap-2">
        <div className="rounded-lg h-96 overflow-auto border border-strokes p-2">
          <div className="w-full flex justify-between pb-3">
            <p className="font-bold">For</p>
            <p className="font-bold">{theone?.upScore}</p>
          </div>
          {upvote?.map((vote) => {
            return (
              <div key={vote.id} className="w-full py-2 flex justify-between">
                <div className="flex items-center">
                  {" "}
                  <img
                    src={generatedNft(vote.from)}
                    className="w-6 h-6 rounded-full border border-accent bg-white"
                  />
                  <p className="font-semibold ml-1 text-xs">
                    {vote.from.length > 15
                      ? getEllipsisTxt(vote.from)
                      : vote.from}
                  </p>
                </div>
                <p className="text-green-500">△ {vote.weight}</p>
              </div>
            );
          })}
        </div>
        <div className="rounded-lg h-96 overflow-auto border border-strokes p-2">
          <div className="w-full flex justify-between pb-3">
            <p className="font-bold">Against</p>
            <p className="font-bold">{theone?.downScore}</p>
          </div>

          {downvote?.map((vote) => {
            return (
              <div key={vote.id} className="w-full py-2 flex justify-between">
                <div className="flex items-center">
                  {" "}
                  <img
                    src={generatedNft(vote.from)}
                    className="w-6 h-6 rounded-full border border-accent bg-white"
                  />
                  <p className="font-semibold ml-1 text-xs">
                    {vote.from.length > 15
                      ? getEllipsisTxt(vote.from)
                      : vote.from}
                  </p>
                </div>
                <p className="text-red-500">▽ {vote.weight}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-full mt-3 sm:mt-5">
        <p className="font-bold text-xl">Details</p>
        <p className="mb-2 text-lg">{theone?.ideaStr}</p>
        <div className="rounded-lg markdown-style min-h-[400px] mb-8 overflow-auto border border-strokes p-2">
          {metadata?.about && (
            <ReactMarkdown
              children={metadata?.about}
              remarkPlugins={[remarkGfm]}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Idea;

const JustARow = ({
  index,
  theone,
}: {
  index: number;
  theone: {
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
  };
}) => {
  const { voting, upVote, downVote, votes } = useVote(index);
  const { account } = useWallet();
  const voterAddresses = useMemo(
    () => votes?.map((vote) => vote.voter),
    [votes]
  );

  const haveYouVoted = useMemo(
    () => !!account && voterAddresses?.includes(account),
    [account, voterAddresses]
  );
  return (
    <div className="flex flex-grow justify-end items-center">
      {account && (
        <>
          <Button
            className="text-sm py-0.5 mr-1 w-full max-w-[80px]"
            loading={voting}
            disabled={haveYouVoted}
            onClick={() => upVote(index)}
          >
            {theone?.upScore && nFormatter(theone.upScore, 3)} 👍
          </Button>
          <Button
            className="text-sm py-0.5 mr-1 w-full max-w-[80px]"
            loading={voting}
            disabled={haveYouVoted}
            onClick={() => downVote(index)}
          >
            {theone?.downScore && nFormatter(theone?.downScore, 3)} 👎
          </Button>
        </>
      )}
    </div>
  );
};

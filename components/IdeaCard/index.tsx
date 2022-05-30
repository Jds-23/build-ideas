import Link from "next/link";
import React, { useMemo } from "react";
import { useVote } from "../../state/app/hooks";
import useWallet from "../../state/wallet/hooks/useWallet";
import { generatedNft, getEllipsisTxt, nFormatter } from "../../utils";
import Button from "../Button";

const IdeaCard = ({
  ideator,
  upVotes,
  votesCount,
  downVotes,
  idea,
  dateCreated,
  index,
}: {
  ideator: string;
  votesCount: number;
  upVotes: number;
  downVotes: number;
  idea: string;
  dateCreated: string;
  index: number;
}) => {
  const { account } = useWallet();
  const { votes, voting, upVote, downVote } = useVote(index);
  const voterAddresses = useMemo(
    () => votes?.map((vote) => vote.voter),
    [votes]
  );

  const haveYouVoted = useMemo(
    () => !!account && voterAddresses?.includes(account),
    [account, voterAddresses]
  );
  return (
    <div className="mb-2 pt-1">
      {upVotes + downVotes === 0 ? (
        <></>
      ) : upVotes - downVotes < 0 ? (
        <p className="text-red-500">▽ {Math.abs(upVotes - downVotes)}</p>
      ) : (
        <p className="text-green-500">△ {Math.abs(upVotes - downVotes)}</p>
      )}
      <div className="w-full p-1 mt-1 sm:p-3 rounded-md border border-strokes sm:rounded-xl">
        <div className="w-full flex justify-between">
          <div className="flex justify-between items-center">
            {/* <div className="w-6 h-6 rounded-full border border-black bg-white" />
             */}
            <img
              src={generatedNft(ideator)}
              className="w-6 h-6 rounded-full border border-accent bg-white"
            />
            <p className="font-semibold ml-1 text-xs">
              {ideator.length > 15 ? getEllipsisTxt(ideator) : ideator}
            </p>
          </div>
          <div className="rounded-lg text-[10px] cursor-pointer p-1 flex border border-strokes items-center">
            {votesCount === 0 ? (
              <Link href={`/idea/${index}`}>
                <a>Be First To Vote 👇</a>
              </Link>
            ) : (
              <>
                {haveYouVoted ? (
                  <>
                    {/* <div className="relative w-[40px] ">
                      <div className="w-6 h-6 rounded-full border border-accent bg-white" />
                      <div className="absolute top-0 left-2 w-6 h-6 rounded-full border border-accent bg-white" />
                      <div className="absolute top-0 left-4 w-6 h-6 rounded-full border border-accent bg-white" />
                    </div> */}
                    <Link href={`/idea/${index}`}>
                      <a>
                        You
                        {votesCount > 1 && (
                          <>+{nFormatter(votesCount - 1, 3)}</>
                        )}{" "}
                        Already Voted 👉
                      </a>
                    </Link>
                  </>
                ) : (
                  <>
                    {/* <div className="relative w-[40px] ">
                      <div className="w-6 h-6 rounded-full border border-accent bg-white" />
                      <div className="absolute top-0 left-2 w-6 h-6 rounded-full border border-accent bg-white" />
                      <div className="absolute top-0 left-4 w-6 h-6 rounded-full border border-accent bg-white" />
                    </div> */}
                    <Link href={`/idea/${index}`}>
                      <a>{nFormatter(votesCount, 3)} Already Voted 👉</a>
                    </Link>
                  </>
                )}
              </>
            )}
          </div>
        </div>
        <p className="text-xs sm:text-sm font-semibold">{idea}</p>
        <div className="mt-1 w-full flex items-center justify-between">
          <p className="text-texty opacity-50 font-bold text-[10px] sm:text-sm">
            {dateCreated}
          </p>
          <div className="flex flex-grow justify-end items-center">
            <Button
              className="text-sm py-0.5 mr-1 w-full max-w-[80px]"
              loading={voting}
              disabled={haveYouVoted}
              onClick={() => upVote(index)}
            >
              {upVotes && nFormatter(upVotes, 3)} 👍
            </Button>
            <Button
              className="text-sm py-0.5 mr-1 w-full max-w-[80px]"
              loading={voting}
              disabled={haveYouVoted}
              onClick={() => downVote(index)}
            >
              {downVotes && nFormatter(downVotes, 3)} 👎
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdeaCard;

import React from "react";
import { getEllipsisTxt, nFormatter } from "../../utils";

const IdeaCard = ({
  ideator,
  upVotes,
  downVotes,
  idea,
  dateCreated,
}: {
  ideator: string;
  upVotes: number;
  downVotes: number;
  idea: string;
  dateCreated: string;
}) => {
  return (
    <div className="w-full p-1 sm:p-3 rounded-md border border-strokes sm:rounded-xl">
      <div className="w-full flex justify-between">
        <div className="flex justify-between items-center">
          <div className="w-6 h-6 rounded-full border border-black bg-white" />
          <p className="font-semibold ml-1 text-xs">
            {ideator.length > 15 ? getEllipsisTxt(ideator) : ideator}
          </p>
        </div>
        <div className="rounded-lg text-[10px] cursor-pointer p-1 flex border border-strokes items-center">
          <div className="relative w-[40px] ">
            <div className="w-6 h-6 rounded-full border border-black bg-white" />
            <div className="absolute top-0 left-2 w-6 h-6 rounded-full border border-black bg-white" />
            <div className="absolute top-0 left-4 w-6 h-6 rounded-full border border-black bg-white" />
          </div>
          <p>+{nFormatter(upVotes + downVotes, 3)} Already Voted 👉</p>
        </div>
      </div>
      <p className="text-xs sm:text-sm font-semibold">{idea}</p>
      <div className="mt-1 flex items-center justify-between">
        <p className="text-texty opacity-50 font-bold text-[10px] sm:text-sm">
          {dateCreated}
        </p>
        <div className="flex items-center">
          <button className="sm:text-sm text-xs font-bold">
            {nFormatter(upVotes, 3)} 👍
          </button>
          <button className="sm:text-sm text-xs font-bold ml-3">
            {nFormatter(downVotes, 3)} 👎
          </button>
        </div>
      </div>
    </div>
  );
};

export default IdeaCard;

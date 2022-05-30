import { useRouter } from "next/router";
import React, { useMemo } from "react";
import { useSubgraph } from "../../hooks/useSubgraph";
import { generatedNft, getEllipsisTxt } from "../../utils";

const Idea = () => {
  const router = useRouter();
  const { slug } = router.query;
  const data = useSubgraph();
  const theone = data?.filter((idea) => idea.id.toString() == slug)[0];
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
  console.log(
    data,
    theone?.votes,
    // @ts-ignore
    theone?.votes?.filter((vote) => vote.type == "0")
  );
  return (
    <div className="w-full px-4 mx-auto max-w-3xl flex flex-col items-center font-semibold">
      <p className="mb-2 text-xl">{theone?.ideaStr}</p>
      <div className="w-full sm:grid sm:grid-cols-2 sm:gap-2">
        <div className="rounded-lg border border-strokes p-1">
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
        <div className="rounded-lg border border-strokes p-1">
          {downvote?.map((vote) => {
            return (
              <div key={vote.id} className="w-full py-2 flex justify-between">
                <div className="flex">
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
    </div>
  );
};

export default Idea;

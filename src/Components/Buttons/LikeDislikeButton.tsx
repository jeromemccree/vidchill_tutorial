import React from "react";
import { useEngagementButton } from "~/Hooks/useEngagement";
import { api } from "~/utils/api";
import { ThumbsUp, ThumbsDown } from "~/Components/Icons/Icons";
import { signIn, useSession } from "next-auth/react";

interface LikeDislikeButtonProps {
  EngagementData: {
    id: string;
    likes: number;
    dislikes: number;
  };
  viewer: {
    hasLiked: boolean;
    hasDisliked: boolean;
  };
}

//* change name of component to Video  engagement
export default function LikeDislikeButton({
  EngagementData,
  viewer,
}: LikeDislikeButtonProps) {
  const { likeCount, dislikeCount, userChoice, handleLike, handleDislike } =
    useEngagementButton({
      EngagementData,
      viewer,
      addLikeMutation: api.videoEngagement.addLike.useMutation(),
      addDislikeMutation: api.videoEngagement.addDislike.useMutation(),
    });

  const { data: sessionData } = useSession();
  return (
    <div className="flex-end isolate  inline-flex rounded-md shadow-sm">
      <button
        type="button"
        onClick={
          sessionData
            ? () =>
                handleLike({
                  id: EngagementData ? EngagementData.id : "",
                  userId: sessionData ? sessionData.user.id : "",
                })
            : () => void signIn()
        }
        className={`focus group relative inline-flex items-center rounded-l-md px-2 py-2 ring-1 ring-inset ring-gray-300  focus:z-10
        ${
          userChoice.like
            ? "group bg-primary-600 text-white hover:text-gray-900 group-hover:stroke-gray-900"
            : "group bg-white text-gray-600 hover:text-primary-600 group-hover:stroke-primary-600"
        }`}
      >
        <ThumbsUp
          className={`group h-4 w-4 shrink-0 ${
            userChoice.like
              ? "group fill-white group-hover:stroke-gray-900"
              : "group stroke-gray-600 group-hover:stroke-primary-600"
          }`}
        />
        <p className="pl-2">{likeCount}</p>
      </button>
      <button
        onClick={
          sessionData
            ? () =>
                handleDislike({
                  id: EngagementData ? EngagementData.id : "",
                  userId: sessionData ? sessionData.user.id : "",
                })
            : () => void signIn()
        }
        className={`focus group relative -ml-px inline-flex items-center rounded-r-md  px-2 py-2 ring-1 ring-inset ring-gray-300 focus:z-10
        ${
          userChoice.dislike
            ? "group bg-error-600 text-white hover:text-gray-900 group-hover:stroke-gray-900"
            : "group bg-white text-gray-600 hover:text-error-600 group-hover:stroke-error-600"
        }`}
      >
        <ThumbsDown
          className={`group h-4 w-4 shrink-0 ${
            userChoice.dislike
              ? "group fill-white group-hover:stroke-gray-900"
              : "group stroke-gray-600 group-hover:stroke-error-600"
          }`}
        />
        <p className="pl-2">{dislikeCount}</p>
      </button>
    </div>
  );
}

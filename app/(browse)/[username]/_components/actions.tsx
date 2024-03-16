"use client";

import { toast } from "sonner";
import { useTransition } from "react";

// import { onBlock, onUnblock } from "@/actions/block";
import { onFollow, onUnfollow } from "@/actions/follow";

import { Button } from "@/components/ui/button";

interface ActionsProps {
  userId: string;
  isFollowing: boolean;
}

export function Actions({ userId, isFollowing }: ActionsProps) {
  const [isPending, startTransition] = useTransition();

  function handleFollow() {
    startTransition(() => {
      onFollow(userId)
        .then((data) => {
          toast.success(`You are now following ${data.following.username}`);
        })
        .catch(() => {
          toast.error("Something went wrong");
        });
    });
  }

  function handleUnfollow() {
    startTransition(() => {
      onUnfollow(userId)
        .then((data) => {
          toast.success(`You have unfollowed ${data.following.username}`);
        })
        .catch(() => {
          toast.error("Something went wrong");
        });
    });
  }

  // function handleBlock() {
  //   startTransition(() => {
  //     onBlock(userId)
  //       .then((data) => {
  //         toast.success(`Blocked the user ${data.blocked.username}`);
  //       })
  //       .catch(() => {
  //         toast.error("Something went wrong");
  //       });
  //   });
  // }

  // function handleUnblock() {
  //   startTransition(() => {
  //     onUnblock(userId)
  //       .then((data) => {
  //         toast.success(`Unblocked the user ${data.blocked.username}`);
  //       })
  //       .catch(() => {
  //         toast.error("Something went wrong");
  //       });
  //   });
  // }

  return (
    <>
      <Button
        variant="primary"
        disabled={isPending}
        onClick={isFollowing ? handleUnfollow : handleFollow}
      >
        {isFollowing ? "Unfollow" : "Follow"}
      </Button>
    </>
  );
}

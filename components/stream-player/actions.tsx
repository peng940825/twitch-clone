"use client";

import { toast } from "sonner";
import { Heart } from "lucide-react";
import { useTransition } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { onFollow, onUnfollow } from "@/actions/follow";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface ActionsProps {
  hostIdentity: string;
  isHost: boolean;
  isFollowing: boolean;
}

export function Actions({ hostIdentity, isHost, isFollowing }: ActionsProps) {
  const router = useRouter();
  const { userId } = useAuth();
  const [isPending, startTransition] = useTransition();

  function handleFollow() {
    startTransition(() => {
      onFollow(hostIdentity)
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
      onUnfollow(hostIdentity)
        .then((data) => {
          toast.success(`You have unfollowed ${data.following.username}`);
        })
        .catch(() => {
          toast.error("Something went wrong");
        });
    });
  }

  function toggleFollow() {
    if (!userId) {
      return router.push("/sign-in");
    }

    if (isHost) {
      return;
    }

    if (isFollowing) {
      handleUnfollow();
    } else {
      handleFollow();
    }
  }

  return (
    <Button
      className="w-full lg:w-auto"
      size="sm"
      variant="primary"
      disabled={isPending || isHost}
      onClick={toggleFollow}
    >
      <Heart className={cn("h-4 w-4 mr-2", isFollowing ? "fill-white" : "fill-none")} />
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
}

export function ActionsSkeleton() {
  return <Skeleton className="h-10 w-full lg:w-24" />;
}

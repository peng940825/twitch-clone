"use client";

import { UserIcon } from "lucide-react";

import { useParticipants, useRemoteParticipant } from "@livekit/components-react";

import { Skeleton } from "@/components/ui/skeleton";
import { VerifiedMark } from "@/components/verified-mark";

import { Actions, ActionsSkeleton } from "./actions";
import { UserAvatar, UserAvatarSkeleton } from "@/components/user-avatar";

interface HeaderProps {
  name: string;
  hostName: string;
  hostIdentity: string;
  imageUrl: string;
  viewerIdentity: string;
  isFollowing: boolean;
}

export function Header({
  name,
  hostName,
  hostIdentity,
  imageUrl,
  viewerIdentity,
  isFollowing,
}: HeaderProps) {
  const participants = useParticipants();
  const participant = useRemoteParticipant(hostIdentity);

  const isLive = !!participant;
  const participantCount = participants.length - 1;

  const hostAsViewer = `host-${hostIdentity}`;
  const isHost = viewerIdentity === hostAsViewer;

  return (
    <div className="flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 items-start justify-between px-4">
      <div className="flex items-center gap-x-3">
        <UserAvatar
          size="lg"
          showBadge
          isLive={isLive}
          imageUrl={imageUrl}
          username={hostName}
        />
        <div className="space-y-1">
          <div className="flex items-center gap-x-2">
            <h2 className="text-lg font-semibold">{hostName}</h2>
            <VerifiedMark />
          </div>
          <p className="text-sm font-semibold">{name}</p>
          {isLive ? (
            <div className="font-semibold flex gap-x-1 items-center text-rose-500">
              <UserIcon className="h-4 w-4" />
              <p>
                {participantCount} {participantCount === 1 ? "viewer" : "viewers"}
              </p>
            </div>
          ) : (
            <p className="text-xs font-semibold text-muted-foreground">Offline</p>
          )}
        </div>
      </div>
      <Actions
        isHost={isHost}
        isFollowing={isFollowing}
        hostIdentity={hostIdentity}
      />
    </div>
  );
}

export function HeaderSkeleton() {
  return (
    <div className="flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 items-start justify-between px-4">
      <div className="flex items-center gap-x-2">
        <UserAvatarSkeleton size="lg" />
        <div className="space-y-2">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
      <ActionsSkeleton />
    </div>
  );
}

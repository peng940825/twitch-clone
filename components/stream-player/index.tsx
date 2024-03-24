"use client";

import { User, Stream } from "@prisma/client";
import { LiveKitRoom } from "@livekit/components-react";

import { useViewerToken } from "@/hooks/use-viewer-token";

import { Video } from "./video";

interface StreamPlayerProps {
  user: User & { stream: Stream | null };
  stream: Stream;
  isFollowing: boolean;
}

export function StreamPlayer({ user, stream, isFollowing }: StreamPlayerProps) {
  const { name, token, identity } = useViewerToken(user.id);

  if (!name || !token || !identity) {
    return <div>Cannot watch stream</div>;
  }

  return (
    <>
      <LiveKitRoom
        token={token}
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
        className="grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full"
      >
        <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto pb-10 hidden-scrollbar">
          <Video
            hostName={user.username}
            hostIdentity={user.id}
          />
        </div>
      </LiveKitRoom>
    </>
  );
}

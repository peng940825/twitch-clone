"use client";

import { User, Stream } from "@prisma/client";
import { LiveKitRoom } from "@livekit/components-react";

import { cn } from "@/lib/utils";
import { useChatSidebar } from "@/store/use-chat-sidebar";
import { useViewerToken } from "@/hooks/use-viewer-token";

import { Chat } from "./chat";
import { Video } from "./video";
import { ChatToggle } from "./chat-toggle";

interface StreamPlayerProps {
  user: User & { stream: Stream | null };
  stream: Stream;
  isFollowing: boolean;
}

export function StreamPlayer({ user, stream, isFollowing }: StreamPlayerProps) {
  const { name, token, identity } = useViewerToken(user.id);

  const { collapsed } = useChatSidebar((state) => state);

  if (!name || !token || !identity) {
    return <div>Cannot watch stream</div>;
  }

  return (
    <>
      {collapsed && (
        <div className="hidden lg:block fixed top-[100px] right-2 z-50">
          <ChatToggle />
        </div>
      )}
      <LiveKitRoom
        token={token}
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
        className={cn(
          "grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full",
          collapsed && "lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2"
        )}
      >
        <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto pb-10 hidden-scrollbar">
          <Video
            hostName={user.username}
            hostIdentity={user.id}
          />
        </div>
        <div className={cn("col-span-1", collapsed && "hidden")}>
          <Chat
            viewerName={name}
            hostName={user.username}
            hostIdentity={user.id}
            isFollowing={isFollowing}
            isChatEnabled={stream.isChatEnabled}
            isChatDelayed={stream.isChatDelayed}
            isChatFollowersOnly={stream.isChatFollowersOnly}
          />
        </div>
      </LiveKitRoom>
    </>
  );
}

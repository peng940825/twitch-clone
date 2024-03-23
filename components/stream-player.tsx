"use client";

import { User, Stream } from "@prisma/client";

import { useViewerToken } from "@/hooks/use-viewer-token";

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

  return <div>Allowed to watch the stream</div>;
}

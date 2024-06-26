"use client";

import { Track, ConnectionState } from "livekit-client";

import { useTracks, useConnectionState, useRemoteParticipant } from "@livekit/components-react";

import { Skeleton } from "@/components/ui/skeleton";

import { OfflineVideo } from "./offline-video";
import { LoadingVideo } from "./loading-video";
import { LiveVideo } from "./live-video";

interface VideoProps {
  hostName: string;
  hostIdentity: string;
}

export function Video({ hostName, hostIdentity }: VideoProps) {
  const connectionState = useConnectionState();

  const participant = useRemoteParticipant(hostIdentity);

  const tracks = useTracks([Track.Source.Camera, Track.Source.Microphone]).filter(
    (track) => track.participant.identity === hostIdentity
  );

  let content;

  if (!participant && connectionState === ConnectionState.Connected) {
    content = <OfflineVideo username={hostName} />;
  } else if (!participant || tracks.length === 0) {
    content = <LoadingVideo label={connectionState} />;
  } else {
    content = <LiveVideo participant={participant} />;
  }

  return <div className="aspect-video border-b relative">{content}</div>;
}

export function VideoSkeleton() {
  return (
    <div className="aspect-video border-x border-background">
      <Skeleton className="h-full w-full rounded-none" />
    </div>
  );
}

"use client";

import { useMemo } from "react";
import { useDebounceValue } from "usehooks-ts";
import { LocalParticipant, RemoteParticipant } from "livekit-client";

import { useParticipants } from "@livekit/components-react";

import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

import { CommunityItem } from "./community-item";

interface ChatCommunityProps {
  hostName: string;
  viewerName: string;
  isHidden: boolean;
}

export function ChatCommunity({ hostName, viewerName, isHidden }: ChatCommunityProps) {
  const [debouncedValue, setDebouncedValue] = useDebounceValue("", 500);

  const participants = useParticipants();

  function onChange(newValue: string) {
    setDebouncedValue(newValue);
  }

  const filteredParticipants = useMemo(() => {
    const deduped = participants.reduce((acc, participant) => {
      const hostAsViewer = `host-${participant.identity}`;

      if (!acc.some((p) => p.identity === hostAsViewer)) {
        acc.push(participant);
      }

      return acc;
    }, [] as (LocalParticipant | RemoteParticipant)[]);

    return deduped.filter((participant) => {
      return participant.name?.toLowerCase().includes(debouncedValue.toLowerCase());
    });
  }, [participants, debouncedValue]);

  if (isHidden) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-sm text-muted-foreground">Community is disabled</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <Input
        className="border-white/10"
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search community"
      />
      <ScrollArea className="gap-y-2 mt-4">
        <p className="text-sm text-center text-muted-foreground hidden last:block p-2">No result</p>
        {filteredParticipants.map((participant) => (
          <CommunityItem
            key={participant.identity}
            hostName={hostName}
            viewerName={viewerName}
            participantName={participant.name}
            participantIdentity={participant.identity}
          />
        ))}
      </ScrollArea>
    </div>
  );
}

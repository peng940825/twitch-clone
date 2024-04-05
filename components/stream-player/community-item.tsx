"use client";

import { toast } from "sonner";
import { useTransition } from "react";
import { MinusCircle } from "lucide-react";

import { onBlock } from "@/actions/block";
import { cn, stringToColor } from "@/lib/utils";

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";

interface CommunityItemProps {
  hostName: string;
  viewerName: string;
  participantName?: string;
  participantIdentity: string;
}

export function CommunityItem({
  hostName,
  viewerName,
  participantName,
  participantIdentity,
}: CommunityItemProps) {
  const [isPending, startTransition] = useTransition();

  const isHost = viewerName === hostName;
  const isSelf = participantName === viewerName;
  const color = stringToColor(participantName || "");

  function handleBlock() {
    if (!participantName || isSelf || !isHost) {
      return;
    }

    startTransition(() => {
      onBlock(participantIdentity)
        .then(() => {
          toast.success(`Blocked ${participantName}`);
        })
        .catch(() => {
          toast.error("Something went wrong");
        });
    });
  }

  return (
    <div
      className={cn(
        "group flex items-center justify-between w-full p-2 rounded-md text-sm hover:bg-white/5",
        isPending && "opacity-50 pointer-events-none"
      )}
    >
      <p style={{ color: color }}>{participantName}</p>
      {isHost && !isSelf && (
        <Hint label="Block">
          <Button
            variant="ghost"
            className="h-auto w-auto p-1 opacity-0 transition group-hover:opacity-100"
            disabled={isPending}
            onClick={handleBlock}
          >
            <MinusCircle className="h-4 w-4 text-muted-foreground" />
          </Button>
        </Hint>
      )}
    </div>
  );
}

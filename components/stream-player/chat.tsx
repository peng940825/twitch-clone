"use client";

import { useMemo, useState, useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";
import { ConnectionState } from "livekit-client";
import { useChat, useConnectionState, useRemoteParticipant } from "@livekit/components-react";

import { ChatVariant, useChatSidebar } from "@/store/use-chat-sidebar";

import { ChatCommunity } from "./chat-community";
import { ChatForm, ChatFormSkeleton } from "./chat-form";
import { ChatList, ChatListSkeleton } from "./chat-list";
import { ChatHeader, ChatHeaderSkeleton } from "./chat-header";

interface ChatProps {
  viewerName: string;
  hostName: string;
  hostIdentity: string;
  isFollowing: boolean;
  isChatEnabled: boolean;
  isChatDelayed: boolean;
  isChatFollowersOnly: boolean;
}

export function Chat({
  viewerName,
  hostName,
  hostIdentity,
  isFollowing,
  isChatEnabled,
  isChatDelayed,
  isChatFollowersOnly,
}: ChatProps) {
  const matches = useMediaQuery("(max-width: 1024px)");
  const { variant, onExpand } = useChatSidebar((state) => state);
  const connectionState = useConnectionState();
  const participant = useRemoteParticipant(hostIdentity);

  const isOnline = participant && connectionState === ConnectionState.Connected;

  const isHidden = !isChatEnabled || !isOnline;

  const [value, setValue] = useState("");
  const { send, chatMessages: messages } = useChat();

  useEffect(() => {
    if (matches) {
      onExpand();
    }
  }, [matches, onExpand]);

  const reversedMessages = useMemo(() => {
    return messages.sort((a, b) => b.timestamp - a.timestamp);
  }, [messages]);

  function onSubmit() {
    if (!send) {
      return;
    }

    send(value);
    setValue("");
  }

  function onChange(value: string) {
    setValue(value);
  }

  return (
    <div className="flex flex-col bg-background border-l border-b pt-0 h-[calc(100vh-80px)]">
      <ChatHeader />
      {variant === ChatVariant.CHAT && (
        <>
          <ChatList
            messages={reversedMessages}
            isHidden={isHidden}
          />
          <ChatForm
            value={value}
            isHidden={isHidden}
            isDelayed={isChatDelayed}
            isFollowing={isFollowing}
            isFollowersOnly={isChatFollowersOnly}
            onSubmit={onSubmit}
            onChange={onChange}
          />
        </>
      )}
      {variant === ChatVariant.COMMUNITY && (
        <ChatCommunity
          hostName={hostName}
          viewerName={viewerName}
          isHidden={isHidden}
        />
      )}
    </div>
  );
}

export function ChatSkeleton() {
  return (
    <div className="flex flex-col border-l border-b pt-0 h-[calc(100vh-80px)] border-2">
      <ChatHeaderSkeleton />
      <ChatListSkeleton />
      <ChatFormSkeleton />
    </div>
  );
}

"use client";

import { toast } from "sonner";
import { useTransition } from "react";

import { onUnblock } from "@/actions/block";
import { Button } from "@/components/ui/button";

interface UnblockButtonProps {
  userId: string;
}

export function UnblockButton({ userId }: UnblockButtonProps) {
  const [isPending, startTransition] = useTransition();

  function onClick() {
    startTransition(() => {
      onUnblock(userId)
        .then((result) => {
          toast.success(`User ${result.blocked.username} unblocked`);
        })
        .catch(() => {
          toast.error("Something went wrong");
        });
    });
  }

  return (
    <Button
      size="sm"
      variant="link"
      className="w-full text-blue-500"
      disabled={isPending}
      onClick={onClick}
    >
      Unblock
    </Button>
  );
}

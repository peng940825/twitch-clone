"use client";

import { toast } from "sonner";
import { useTransition } from "react";

import { updateStream } from "@/actions/stream";

import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";

type FieldTypes = "isChatEnabled" | "isChatDelayed" | "isChatFollowersOnly";

interface ToggleCardProps {
  label: string;
  value: boolean;
  field: FieldTypes;
}

export function ToggleCard({ label, value, field }: ToggleCardProps) {
  const [isPending, startTransition] = useTransition();

  function onChange() {
    startTransition(() => {
      updateStream({ [field]: !value })
        .then(() => {
          toast.success("Chat settings updated!");
        })
        .catch(() => {
          toast.error("Something went wrong");
        });
    });
  }

  return (
    <div className="rounded-xl bg-muted p-6">
      <div className="flex items-center justify-between">
        <p className="font-semibold shrink-0">{label}</p>
        <div className="space-y-2">
          <Switch
            checked={value}
            disabled={isPending}
            onCheckedChange={onChange}
          >
            {value ? "On" : "Off"}
          </Switch>
        </div>
      </div>
    </div>
  );
}

export function ToggleCardSkeleton() {
  return <Skeleton className="w-full rounded-xl p-10" />;
}

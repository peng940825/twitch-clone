"use client";

import { toast } from "sonner";
import { useRef, useState, useTransition, ElementRef } from "react";

import { updateUser } from "@/actions/user";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogClose,
  DialogTitle,
  DialogHeader,
  DialogTrigger,
  DialogContent,
} from "@/components/ui/dialog";

interface BioModalProps {
  initialValue: string | null;
}

export function BioModal({ initialValue }: BioModalProps) {
  const closeRef = useRef<ElementRef<"button">>(null);

  const [isPending, startTransition] = useTransition();

  const [value, setValue] = useState(initialValue || "");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    startTransition(() => {
      updateUser({
        bio: value,
      })
        .then(() => {
          toast.success("User bio updated");
          closeRef.current?.click();
        })
        .catch(() => {
          toast.error("Something went wrong");
        });
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="link"
          className="ml-auto"
        >
          Edit
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit user bio</DialogTitle>
        </DialogHeader>

        <form
          className="space-y-4"
          onSubmit={onSubmit}
        >
          <Textarea
            value={value || ""}
            onChange={(e) => setValue(e.target.value)}
            disabled={isPending}
            className="resize-none"
            placeholder="User bio"
          />

          <div className="flex justify-between">
            <DialogClose
              ref={closeRef}
              asChild
            >
              <Button
                type="button"
                variant="ghost"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              variant="primary"
              disabled={isPending}
            >
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

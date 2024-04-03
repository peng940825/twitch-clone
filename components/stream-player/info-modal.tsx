"use client";

import Image from "next/image";
import { toast } from "sonner";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState, useTransition, ElementRef } from "react";

import { updateStream } from "@/actions/stream";
import { UploadDropzone } from "@/lib/uploadthing";

import { Hint } from "@/components/hint";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogTitle,
  DialogHeader,
  DialogTrigger,
  DialogContent,
} from "@/components/ui/dialog";

interface InfoModalProps {
  initialName: string;
  initialThumbnailUrl: string | null;
}

export function InfoModal({ initialName, initialThumbnailUrl }: InfoModalProps) {
  const router = useRouter();

  const closeRef = useRef<ElementRef<"button">>(null);

  const [isPending, startTransition] = useTransition();

  const [name, setName] = useState(initialName);
  const [thumbnailUrl, setThumbnailUrl] = useState(initialThumbnailUrl);

  function onRemove() {
    startTransition(() => {
      updateStream({
        thumbnailUrl: null,
      })
        .then(() => {
          toast.success("Thumbnail removed");
          setThumbnailUrl("");
          closeRef.current?.click();
        })
        .catch(() => {
          toast.error("Something went wrong");
        });
    });
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    startTransition(() => {
      updateStream({
        name,
      })
        .then(() => {
          toast.success("Stream updated");
          closeRef.current?.click();
        })
        .catch(() => {
          toast.error("Something went wrong");
        });
    });
  }

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
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
          <DialogTitle>Edit stream info</DialogTitle>
        </DialogHeader>

        <form
          className="space-y-14"
          onSubmit={onSubmit}
        >
          <div className="space-y-2">
            <Label>Name</Label>
            <Input
              value={name}
              disabled={isPending}
              onChange={onChange}
              placeholder="Stream name"
            />
          </div>

          <div className="space-y-2">
            <Label>Thumbnail</Label>

            {thumbnailUrl ? (
              <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10">
                <div className="absolute top-2 right-2 z-[10]">
                  <Hint
                    asChild
                    label="Remove thumbnail"
                    side="left"
                  >
                    <Button
                      type="button"
                      disabled={isPending}
                      onClick={onRemove}
                      className="h-auto w-auto p-1.5"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </Hint>
                </div>
                <Image
                  fill
                  className="object-cover"
                  src={thumbnailUrl}
                  alt="Thumbnail"
                />
              </div>
            ) : (
              <div className="rounded-xl border outline-dashed outline-muted">
                <UploadDropzone
                  endpoint="thumbnailUploader"
                  appearance={{
                    label: {
                      color: "#FFFFFF",
                    },
                    allowedContent: {
                      color: "#FFFFFF",
                    },
                  }}
                  onClientUploadComplete={(res) => {
                    setThumbnailUrl(res?.[0]?.url);
                    router.refresh();
                    closeRef.current?.click();
                  }}
                />
              </div>
            )}
          </div>

          <div className="flex justify-between">
            <DialogClose
              asChild
              ref={closeRef}
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

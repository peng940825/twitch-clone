"use client";

import { toast } from "sonner";
import { AlertTriangle } from "lucide-react";
import { IngressInput } from "livekit-server-sdk";
import { useRef, useState, useTransition, type ElementRef } from "react";

import { createIngress } from "@/actions/ingress";

import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import {
  Select,
  SelectItem,
  SelectValue,
  SelectContent,
  SelectTrigger,
} from "@/components/ui/select";
import {
  Dialog,
  DialogTitle,
  DialogClose,
  DialogHeader,
  DialogTrigger,
  DialogContent,
} from "@/components/ui/dialog";

const RTMP = String(IngressInput.RTMP_INPUT);
const WHIP = String(IngressInput.WHIP_INPUT);

type IngressType = typeof RTMP | typeof WHIP;

export function ConnectModal() {
  const closeRef = useRef<ElementRef<"button">>(null);

  const [ingressType, setIngressType] = useState<IngressType>(RTMP);

  const [isPending, startTransition] = useTransition();

  function onSubmit() {
    startTransition(() => {
      createIngress(parseInt(ingressType))
        .then(() => {
          toast.success("Ingress created");
          closeRef?.current?.click();
        })
        .catch(() => {
          toast.error("Something went wrong");
        });
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="primary">Generate connection</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generate connection</DialogTitle>
        </DialogHeader>

        <Select
          value={ingressType}
          disabled={isPending}
          onValueChange={(value) => setIngressType(value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Ingress Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={RTMP}>RTMP</SelectItem>
            <SelectItem value={WHIP}>WHIP</SelectItem>
          </SelectContent>
        </Select>

        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Warning!</AlertTitle>
          <AlertDescription>
            This action will reset all active streams using the current connection
          </AlertDescription>
        </Alert>

        <div className="flex justify-between">
          <DialogClose
            ref={closeRef}
            asChild
          >
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <Button
            variant="primary"
            disabled={isPending}
            onClick={onSubmit}
          >
            Generate
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

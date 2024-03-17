"use client";

import { useState } from "react";
import { CheckCheck, Copy } from "lucide-react";

import { Button } from "@/components/ui/button";

interface CopyButtonProps {
  value?: string;
}

export function CopyButton({ value }: CopyButtonProps) {
  const [isCopied, setIsCopied] = useState(false);

  function onCopy() {
    if (!value) {
      return;
    }

    setIsCopied(true);

    navigator.clipboard.writeText(value);

    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  }

  const Icon = isCopied ? CheckCheck : Copy;

  return (
    <Button
      size="sm"
      variant="ghost"
      disabled={!value || isCopied}
      onClick={onCopy}
    >
      <Icon className="h-4 w-4" />
    </Button>
  );
}

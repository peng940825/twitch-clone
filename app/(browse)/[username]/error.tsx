"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function ErrorPage() {
  return (
    <div className="h-full flex flex-col space-y-4 items-center justify-center text-muted-foreground">
      <p>Something went wrong</p>
      <Button
        asChild
        variant="secondary"
      >
        <Link href="/">Go back home</Link>
      </Button>
    </div>
  );
}

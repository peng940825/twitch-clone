"use client";

import { Volume1, Volume2, VolumeX } from "lucide-react";

import { Hint } from "@/components/hint";
import { Slider } from "@/components/ui/slider";

interface VolumeControlProps {
  value: number;
  onToggle: () => void;
  onChange: (value: number) => void;
}

export function VolumeControl({ value, onToggle, onChange }: VolumeControlProps) {
  const isMuted = value === 0;
  const isAboveHalf = value > 50;

  let Icon = Volume1;

  if (isMuted) {
    Icon = VolumeX;
  } else if (isAboveHalf) {
    Icon = Volume2;
  }

  const label = isMuted ? "Unmute" : "Mute";

  function handleChange(value: number[]) {
    onChange(value[0]);
  }

  return (
    <div className="flex items-center gap-2">
      <Hint
        label={label}
        asChild
      >
        <button
          className="text-white hover:bg-white/10 p-1.5 rounded-lg"
          onClick={onToggle}
        >
          <Icon className="h-6 w-6" />
        </button>
      </Hint>
      <Slider
        className="w-[8rem] cursor-pointer"
        value={[value]}
        step={1}
        max={100}
        onValueChange={handleChange}
      />
    </div>
  );
}

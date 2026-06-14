"use client";

interface AdSlotProps {
  slot: string;
  className?: string;
}

export default function AdSlot({ slot, className = "" }: AdSlotProps) {
  return (
    <div
      data-ad-slot={slot}
      className={`flex items-center justify-center bg-zinc-800 border border-zinc-700 text-zinc-500 text-xs rounded ${className}`}
    >
      Advertisement
    </div>
  );
}

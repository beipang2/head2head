"use client";

const AD_ENABLED = process.env.NEXT_PUBLIC_ADS_ENABLED === "true";

interface AdSlotProps {
  slot: string;
  className?: string;
}

export default function AdSlot({ slot, className = "" }: AdSlotProps) {
  if (!AD_ENABLED) return null;

  return (
    <div
      data-ad-slot={slot}
      className={`flex items-center justify-center bg-zinc-800 border border-zinc-700 text-zinc-500 text-xs rounded ${className}`}
    >
      {/* Replace with your ad network script */}
    </div>
  );
}

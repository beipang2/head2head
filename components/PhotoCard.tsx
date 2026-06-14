"use client";

import Image from "next/image";
import siteConfig from "@/site.config";

interface Photo {
  id: string;
  url: string;
  label?: string | null;
}

interface PhotoCardProps {
  photo: Photo;
  onClick: (id: string) => void;
  disabled?: boolean;
  winner?: boolean;
  loser?: boolean;
}

const accentRing: Record<typeof siteConfig.accentColor, string> = {
  rose: "ring-rose-500 focus-visible:ring-rose-500 hover:shadow-rose-900/30",
  blue: "ring-blue-500 focus-visible:ring-blue-500 hover:shadow-blue-900/30",
  emerald: "ring-emerald-500 focus-visible:ring-emerald-500 hover:shadow-emerald-900/30",
  violet: "ring-violet-500 focus-visible:ring-violet-500 hover:shadow-violet-900/30",
  amber: "ring-amber-500 focus-visible:ring-amber-500 hover:shadow-amber-900/30",
  cyan: "ring-cyan-500 focus-visible:ring-cyan-500 hover:shadow-cyan-900/30",
  orange: "ring-orange-500 focus-visible:ring-orange-500 hover:shadow-orange-900/30",
};

const accentBg: Record<typeof siteConfig.accentColor, string> = {
  rose: "bg-rose-500",
  blue: "bg-blue-500",
  emerald: "bg-emerald-500",
  violet: "bg-violet-500",
  amber: "bg-amber-500",
  cyan: "bg-cyan-500",
  orange: "bg-orange-500",
};

export default function PhotoCard({
  photo,
  onClick,
  disabled,
  winner,
  loser,
}: PhotoCardProps) {
  const ring = accentRing[siteConfig.accentColor];
  const bg = accentBg[siteConfig.accentColor];

  return (
    <button
      onClick={() => onClick(photo.id)}
      disabled={disabled}
      className={`
        relative group w-full aspect-square max-w-lg rounded-2xl overflow-hidden
        transition-all duration-300 outline-none focus-visible:ring-4 ${ring}
        ${disabled ? "cursor-default" : `cursor-pointer hover:scale-[1.02] hover:shadow-2xl ${ring}`}
        ${winner ? `ring-4 ${ring} scale-[1.02]` : ""}
        ${loser ? "opacity-40" : ""}
      `}
    >
      <Image
        src={photo.url}
        alt={photo.label ?? "Photo"}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
      <div
        className={`
          absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent
          transition-opacity duration-200
          ${disabled ? "opacity-100" : "opacity-0 group-hover:opacity-100"}
        `}
      />
      {photo.label && (
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <p className="text-white font-semibold text-lg drop-shadow">
            {photo.label}
          </p>
        </div>
      )}
      {winner && (
        <div className={`absolute top-4 left-1/2 -translate-x-1/2 ${bg} text-white text-sm font-bold px-4 py-1 rounded-full shadow-lg`}>
          Winner!
        </div>
      )}
    </button>
  );
}

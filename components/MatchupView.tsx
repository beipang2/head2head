"use client";

import { useState, useCallback } from "react";
import PhotoCard from "./PhotoCard";
import AdSlot from "./AdSlot";
import siteConfig from "@/site.config";

interface Photo {
  id: string;
  url: string;
  label?: string | null;
}

interface MatchupViewProps {
  initialA: Photo;
  initialB: Photo;
}

export default function MatchupView({ initialA, initialB }: MatchupViewProps) {
  const [photoA, setPhotoA] = useState<Photo>(initialA);
  const [photoB, setPhotoB] = useState<Photo>(initialB);
  const [voted, setVoted] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleVote = useCallback(
    async (winnerId: string) => {
      if (voted || loading) return;
      setVoted(winnerId);
      setLoading(true);

      try {
        await fetch("/api/vote", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            photoAId: photoA.id,
            photoBId: photoB.id,
            winnerId,
          }),
        });

        await new Promise((r) => setTimeout(r, 800));

        const res = await fetch("/api/pair");
        if (res.ok) {
          const { a, b } = await res.json();
          setPhotoA(a);
          setPhotoB(b);
          setVoted(null);
          setError(null);
        } else {
          setError("No more matchups available.");
        }
      } catch {
        setError("Something went wrong. Please try again.");
        setVoted(null);
      } finally {
        setLoading(false);
      }
    },
    [photoA, photoB, voted, loading]
  );

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      <AdSlot slot="top-banner" className="w-full h-20 max-w-2xl" />

      <p className="text-zinc-400 text-sm tracking-widest uppercase">
        {siteConfig.votePrompt}
      </p>

      <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 w-full max-w-4xl px-4">
        <PhotoCard
          photo={photoA}
          onClick={handleVote}
          disabled={!!voted || loading}
          winner={voted === photoA.id}
          loser={voted !== null && voted !== photoA.id}
        />

        <div className="flex-shrink-0">
          <span className="text-4xl font-black text-zinc-600 tracking-tighter">
            VS
          </span>
        </div>

        <PhotoCard
          photo={photoB}
          onClick={handleVote}
          disabled={!!voted || loading}
          winner={voted === photoB.id}
          loser={voted !== null && voted !== photoB.id}
        />
      </div>

      {error && <p className="text-rose-400 text-sm">{error}</p>}

      <AdSlot slot="bottom-banner" className="w-full h-20 max-w-2xl" />
    </div>
  );
}

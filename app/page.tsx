import { getLeaderboard } from "@/lib/queries";
import TournamentView from "@/components/TournamentView";

export const dynamic = "force-dynamic";

export default async function Home() {
  const photos = await getLeaderboard();

  if (photos.length < 4) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
        <p className="text-3xl font-black text-zinc-600">Not enough photos yet.</p>
        <p className="text-zinc-500">
          The admin needs to upload at least 4 photos to start a tournament.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-8 w-full">
      <h1 className="text-4xl font-black tracking-tight text-center">
        &lt;Tagline&gt;
      </h1>
      <TournamentView photos={photos} />
    </div>
  );
}

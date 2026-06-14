import { getLeaderboard } from "@/lib/queries";
import Leaderboard from "@/components/Leaderboard";

export const dynamic = "force-dynamic";

export default async function LeaderboardPage() {
  const photos = await getLeaderboard();

  return (
    <div className="flex flex-col items-center gap-8 w-full">
      <h1 className="text-4xl font-black tracking-tight">Rankings</h1>
      {photos.length === 0 ? (
        <p className="text-zinc-500">No photos yet.</p>
      ) : (
        <Leaderboard photos={photos} />
      )}
    </div>
  );
}

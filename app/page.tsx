import { getPhotoPair } from "@/lib/queries";
import MatchupView from "@/components/MatchupView";

export const dynamic = "force-dynamic";

export default async function Home() {
  const pair = await getPhotoPair();

  if (!pair) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
        <p className="text-3xl font-black text-zinc-600">No matchups yet.</p>
        <p className="text-zinc-500">
          The admin needs to upload at least 2 photos to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-8 w-full">
      <h1 className="text-4xl font-black tracking-tight text-center">
        Which one is better?
      </h1>
      <MatchupView initialA={pair[0]} initialB={pair[1]} />
    </div>
  );
}

import { prisma } from "@/lib/db";
import MatchupView from "@/components/MatchupView";
import siteConfig from "@/site.config";

export const dynamic = "force-dynamic";

export default async function Home() {
  const photos = await prisma.photo.findMany({
    where: { hidden: false },
    select: { id: true, url: true, label: true },
  });

  if (photos.length < 2) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
        <p className="text-3xl font-black text-zinc-600">No matchups yet.</p>
        <p className="text-zinc-500">
          The admin needs to upload at least 2 photos to get started.
        </p>
      </div>
    );
  }

  const shuffled = [...photos].sort(() => Math.random() - 0.5);

  return (
    <div className="flex flex-col items-center gap-8 w-full">
      <h1 className="text-4xl font-black tracking-tight text-center">
        {siteConfig.tagline}
      </h1>
      <MatchupView initialA={shuffled[0]} initialB={shuffled[1]} />
    </div>
  );
}

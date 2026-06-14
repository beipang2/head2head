import { prisma } from "./db";

export type Photo = {
  id: string;
  url: string;
  label: string | null;
};

export type RankedPhoto = Photo & {
  rating: number;
  wins: number;
  losses: number;
};

export async function getPhotoPair(): Promise<[Photo, Photo] | null> {
  const photos = await prisma.photo.findMany({
    where: { hidden: false },
    select: { id: true, url: true, label: true },
  });
  if (photos.length < 2) return null;
  const shuffled = photos.sort(() => Math.random() - 0.5);
  return [shuffled[0], shuffled[1]];
}

export async function getLeaderboard(): Promise<RankedPhoto[]> {
  return prisma.photo.findMany({
    where: { hidden: false },
    orderBy: { rating: "desc" },
    select: { id: true, url: true, label: true, rating: true, wins: true, losses: true },
  });
}

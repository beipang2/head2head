import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: NextRequest) {
  const photos = await prisma.photo.findMany({
    where: { hidden: false },
    select: { id: true, url: true, label: true, rating: true },
  });

  if (photos.length < 2) {
    return NextResponse.json({ error: "Not enough photos" }, { status: 404 });
  }

  // Weighted random selection — photos closer in rating face each other more often
  const shuffle = [...photos].sort(() => Math.random() - 0.5);
  const a = shuffle[0];
  const b = shuffle[1];

  return NextResponse.json({ a, b });
}

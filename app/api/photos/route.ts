import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  const photos = await prisma.photo.findMany({
    where: { hidden: false },
    orderBy: { rating: "desc" },
    select: {
      id: true,
      url: true,
      label: true,
      rating: true,
      wins: true,
      losses: true,
    },
  });
  return NextResponse.json(photos);
}

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const photos = [
  { seed: "alpine",     label: "Alpine Lake" },
  { seed: "canyon",     label: "Red Canyon" },
  { seed: "forest",     label: "Ancient Forest" },
  { seed: "coast",      label: "Rocky Coast" },
  { seed: "desert",     label: "Sand Dunes" },
  { seed: "waterfall",  label: "Hidden Waterfall" },
  { seed: "glacier",    label: "Blue Glacier" },
  { seed: "savanna",    label: "Golden Savanna" },
  { seed: "volcano",    label: "Active Volcano" },
  { seed: "fjord",      label: "Norwegian Fjord" },
  { seed: "meadow",     label: "Alpine Meadow" },
  { seed: "reef",       label: "Coral Reef" },
  { seed: "tundra",     label: "Arctic Tundra" },
  { seed: "bayou",      label: "Southern Bayou" },
  { seed: "mesa",       label: "Red Mesa" },
  { seed: "mangrove",   label: "Mangrove Swamp" },
];

async function main() {
  console.log("Seeding photos…");

  await prisma.photo.deleteMany();

  for (const p of photos) {
    await prisma.photo.create({
      data: {
        url: `https://picsum.photos/seed/${p.seed}/800/800`,
        label: p.label,
      },
    });
  }

  console.log(`✓ Inserted ${photos.length} photos`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());

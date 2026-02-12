import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.recipe.createMany({
    data: [
      {
        name: "Kyllingefad med rodfrugter",
        basePricePerPerson: 28,
        tags: ["standard", "børnevenlig"],
        ingredients: ["kylling", "kartofler", "gulerødder", "løg"]
      },
      {
        name: "Vegetarisk chili sin carne",
        basePricePerPerson: 22,
        tags: ["vegetar"],
        ingredients: ["bønner", "hakkede tomater", "løg", "peberfrugt"]
      }
    ],
    skipDuplicates: true
  });

  await prisma.storeOffer.createMany({
    data: [
      {
        storeName: "Føtex Food",
        ingredient: "kylling",
        discountedPrice: 18,
        validFrom: new Date("2026-01-01"),
        validTo: new Date("2026-12-31")
      },
      {
        storeName: "Føtex Food",
        ingredient: "hakkede tomater",
        discountedPrice: 5,
        validFrom: new Date("2026-01-01"),
        validTo: new Date("2026-12-31")
      }
    ],
    skipDuplicates: true
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });

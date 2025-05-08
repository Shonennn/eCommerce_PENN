import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.product.createMany({
    data: [
      {
        name: 'Demo Camper 2021',
        description: 'A rugged camper for off-road adventures.',
        price: 24999.99,
        imageUrl: 'https://placehold.co/600x400',
      },
      {
        name: 'Luxury RV 2022',
        description: 'A luxurious RV with all modern amenities.',
        price: 74999.99,
        imageUrl: 'https://placehold.co/600x400',
      },
      {
        name: 'Family Trailer',
        description: 'Spacious trailer ideal for family trips.',
        price: 34999.50,
        imageUrl: 'https://placehold.co/600x400',
      },
    ],
  });

  console.log('✅ Seeded fake products');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

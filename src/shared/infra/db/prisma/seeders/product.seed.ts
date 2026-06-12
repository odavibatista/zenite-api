import { PrismaClient } from '@prisma/client';

export const productSeeder = async (
  prisma: PrismaClient,
) => {
  console.log('Running product seeder...');

  const products = [
    {
      name: 'BioGrow Plus',
      category: 'Fertilizante',
      minimumStock: 150,
      expirationDate: new Date('2026-10-03'),
    },
    {
      name: 'NPK Prime',
      category: 'Fertilizante',
      minimumStock: 120,
      expirationDate: new Date('2026-11-12'),
    },
    {
      name: 'AgroDef Max',
      category: 'Defensivo',
      minimumStock: 80,
      expirationDate: new Date('2026-09-25'),
    },
    {
      name: 'SeedPro Milho',
      category: 'Semente',
      minimumStock: 200,
      expirationDate: new Date('2026-12-20'),
    },
    {
      name: 'Ureia Plus',
      category: 'Fertilizante',
      minimumStock: 180,
      expirationDate: new Date('2026-10-06'),
    },
  ];

  for (const product of products) {
    const exists = await prisma.product.findFirst({
      where: {
        name: product.name,
      },
    });

    if (!exists) {
      await prisma.product.create({
        data: product,
      });
    }
  }
};
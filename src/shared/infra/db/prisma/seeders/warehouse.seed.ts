import { PrismaClient } from '@prisma/client';

export const warehouseSeeder = async (
  prisma: PrismaClient,
) => {
  console.log('Running warehouse seeder...');

  const warehouses = [
    {
      code: 'MG-01',
      name: 'Armazém Minas Gerais',
      city: 'Uberlândia',
      state: 'MG',
    },
    {
      code: 'SP-01',
      name: 'Armazém São Paulo',
      city: 'Ribeirão Preto',
      state: 'SP',
    },
    {
      code: 'SP-02',
      name: 'Armazém São Paulo II',
      city: 'Campinas',
      state: 'SP',
    },
    {
      code: 'PR-01',
      name: 'Armazém Paraná',
      city: 'Londrina',
      state: 'PR',
    },
    {
      code: 'GO-01',
      name: 'Armazém Goiás',
      city: 'Rio Verde',
      state: 'GO',
    },
  ];

  for (const warehouse of warehouses) {
    const exists = await prisma.warehouse.findFirst({
      where: {
        code: warehouse.code,
      },
    });

    if (!exists) {
      await prisma.warehouse.create({
        data: warehouse,
      });
    }
  }
};
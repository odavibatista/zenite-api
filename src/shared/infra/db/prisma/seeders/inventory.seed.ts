import { PrismaClient } from '@prisma/client';

export const inventorySeeder = async (
  prisma: PrismaClient,
) => {
  console.log('Running inventory seeder...');

  const products = await prisma.product.findMany();

  const warehouses = await prisma.warehouse.findMany();

  for (const product of products) {
    const warehouse =
      warehouses[
        Math.floor(Math.random() * warehouses.length)
      ];

    const exists = await prisma.inventory.findFirst({
      where: {
        productId: product.id,
        warehouseId: warehouse.id,
      },
    });

    if (!exists) {
      await prisma.inventory.create({
        data: {
          productId: product.id,
          warehouseId: warehouse.id,

          quantity:
            product.name === 'Ureia Plus'
              ? 40
              : Math.floor(Math.random() * 800),

          monthlyStorageCost:
            Math.random() * 300,
        },
      });
    }
  }
};
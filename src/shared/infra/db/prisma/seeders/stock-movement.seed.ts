import {
    PrismaClient,
    MovementType,
  } from '@prisma/client';
  
  export const stockMovementSeeder = async (
    prisma: PrismaClient,
  ) => {
    console.log('Running stock movement seeder...');
  
    const inventories =
      await prisma.inventory.findMany();
  
    for (const inventory of inventories) {
      await prisma.stockMovement.create({
        data: {
          productId: inventory.productId,
  
          warehouseId: inventory.warehouseId,
  
          movementType:
            Math.random() > 0.5
              ? MovementType.INBOUND
              : MovementType.OUTBOUND,
  
          quantity:
            Math.floor(Math.random() * 100) + 1,
  
          reason: 'Movimentação Seed',
        },
      });
    }
  };
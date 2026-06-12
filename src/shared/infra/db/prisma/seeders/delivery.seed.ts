import {
    PrismaClient,
    DeliveryStatus,
  } from '@prisma/client';
  
  export const deliverySeeder = async (
    prisma: PrismaClient,
  ) => {
    console.log('Running delivery seeder...');
  
    const products = await prisma.product.findMany();
  
    for (const product of products) {
      await prisma.delivery.create({
        data: {
          productId: product.id,
  
          quantity:
            Math.floor(Math.random() * 100) + 10,
  
          expectedDate: new Date(),
  
          deliveredDate:
            Math.random() > 0.5
              ? new Date()
              : null,
  
          status:
            Math.random() > 0.7
              ? DeliveryStatus.LATE
              : DeliveryStatus.DELIVERED,
        },
      });
    }
  };
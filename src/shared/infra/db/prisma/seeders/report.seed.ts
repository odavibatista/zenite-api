import { PrismaClient } from '@prisma/client';

export const reportSeeder = async (
  prisma: PrismaClient,
) => {
  console.log('Running report seeder...');

  const exists =
    await prisma.report.findFirst();

  if (!exists) {
    await prisma.report.create({
      data: {
        summary:
          'Foram identificados produtos abaixo do estoque mínimo e entregas atrasadas.',

        criticalProducts: 3,

        expiredProducts: 1,

        delayedDeliveries: 2,

        recommendations: '',
    
        totalStorageCost: 1500.5,
      },
    });
  }
};
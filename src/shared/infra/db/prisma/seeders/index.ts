import 'dotenv/config';


import { warehouseSeeder } from './warehouse.seed';
import { productSeeder } from './product.seed';
import { inventorySeeder } from './inventory.seed';
import { stockMovementSeeder } from './stock-movement.seed';
import { deliverySeeder } from './delivery.seed';
import { reportSeeder } from './report.seed';
import { PrismaProvider } from 'src/shared/infra/providers/Prisma.provider';
import { appConfigurations } from 'src/shared/config/app.config';

const prisma = new PrismaProvider();

const seed = async () => {
  console.log('Running Zênite seed...');

  await prisma.seed([
    warehouseSeeder,
    productSeeder,
    inventorySeeder,
    stockMovementSeeder,
    deliverySeeder,
    reportSeeder,
  ]);
};

if (
    appConfigurations.NODE_ENV === 'development'
  ) {
    seed();
  }
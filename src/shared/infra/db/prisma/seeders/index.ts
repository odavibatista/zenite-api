import 'dotenv/config';


import { warehouseSeeder } from './warehouse.seed';
import { productSeeder } from './product.seed';
import { inventorySeeder } from './inventory.seed';
import { stockMovementSeeder } from './stock-movement.seed';
import { deliverySeeder } from './delivery.seed';
import { reportSeeder } from './report.seed';
import { PrismaProvider } from 'src/shared/infra/providers/Prisma.provider';

const prisma = new PrismaProvider();

const seed = async () => {
  console.log('Running Zênite seed...');

  prisma.seed([
    warehouseSeeder,
    productSeeder,
    inventorySeeder,
    stockMovementSeeder,
    deliverySeeder,
    reportSeeder,
  ]);
};

seed();
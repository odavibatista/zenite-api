import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { InventoryController } from '../../http/controllers/inventory.controller';
import { InventoryRepository } from '../db/repositories/inventory.repository';

@Module({
    controllers: [InventoryController],
    providers: [
        InventoryRepository,
    ],
  })
export class InventoryModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply().forRoutes();
  }
}
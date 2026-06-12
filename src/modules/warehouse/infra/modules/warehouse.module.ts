import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { WarehouseController } from '../../http/controllers/warehouse.controller';
import { WarehouseRepository } from '../db/repositories/warehouse.repository';

@Module({
    controllers: [WarehouseController],
    providers: [
        WarehouseRepository,
    ],
  })
export class WarehouseModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply().forRoutes();
  }
}
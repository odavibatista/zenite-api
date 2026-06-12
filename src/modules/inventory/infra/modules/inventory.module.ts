import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { InventoryController } from '../../http/controllers/inventory.controller';
import { InventoryRepository } from '../db/repositories/inventory.repository';
import { AuthenticationMiddleware } from 'src/shared/http/middlewares/Auth.middleware';

@Module({
  controllers: [InventoryController],
  providers: [InventoryRepository],
})
export class InventoryModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticationMiddleware).forRoutes({
      method: RequestMethod.ALL,
      path: '/inventory/*path',
    });
  }
}

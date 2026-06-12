import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { InventoryController } from '../../http/controllers/inventory.controller';
import { InventoryRepository } from '../db/repositories/inventory.repository';
import { AuthenticationMiddleware } from 'src/shared/http/middlewares/Auth.middleware';
import { FindAllInventoriesUsecase } from '../usecases/find-all-inventories.usecase';
import { SeasonProvider } from 'src/shared/infra/providers/Season.provider';

@Module({
  controllers: [InventoryController],
  providers: [InventoryRepository,
    FindAllInventoriesUsecase,
    SeasonProvider,
  ],
})
export class InventoryModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticationMiddleware).forRoutes({
      method: RequestMethod.ALL,
      path: '/inventory/*path',
    });
  }
}

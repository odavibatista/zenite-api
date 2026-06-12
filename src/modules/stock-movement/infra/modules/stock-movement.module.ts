import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { StockMovementController } from '../../http/controllers/stock-movement.controller';
import { StockMovementRepository } from '../db/repositories/stock-movement.repository';
import { AuthenticationMiddleware } from 'src/shared/http/middlewares/Auth.middleware';

@Module({
  controllers: [StockMovementController],
  providers: [StockMovementRepository],
})
export class StockMovementModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticationMiddleware).forRoutes({
      method: RequestMethod.ALL,
      path: '/stock-movements/*path',
    });
  }
}

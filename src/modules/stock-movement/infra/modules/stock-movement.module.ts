import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { StockMovementController } from '../../http/controllers/stock-movement.controller';
import { StockMovementRepository } from '../db/repositories/stock-movement.repository';

@Module({
    controllers: [StockMovementController],
    providers: [
        StockMovementRepository,
    ],
  })
  
export class StockMovementModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply().forRoutes();
  }
}

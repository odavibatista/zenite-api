import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ProductController } from '../../http/controllers/product.controller';
import { ProductRepository } from '../db/repositories/product.repository';

@Module({
  controllers: [ProductController],
  providers: [ProductRepository],
})
export class ProductModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply().forRoutes();
  }
}

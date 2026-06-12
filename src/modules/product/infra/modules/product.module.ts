import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ProductController } from '../../http/controllers/product.controller';
import { ProductRepository } from '../db/repositories/product.repository';
import { FindAllProductsUsecase } from '../usecases/find-all-products.usecase';
import { FindProductByIdUsecase } from '../usecases/find-product-by-id.usecase';
import { SeasonProvider } from 'src/shared/infra/providers/Season.provider';
import { AuthenticationMiddleware } from 'src/shared/http/middlewares/Auth.middleware';

@Module({
  controllers: [ProductController],
  providers: [
    ProductRepository,
    FindAllProductsUsecase,
    FindProductByIdUsecase,
    SeasonProvider,
  ],
})
export class ProductModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticationMiddleware).forRoutes({
      method: RequestMethod.ALL,
      path: '/products/*path',
    });
  }
}

import {
  MiddlewareConsumer,
  Module,
  NestModule,
  ValidationPipe,
} from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from '../shared/infra/modules/shared.module';
import { WarehouseModule } from '../modules/warehouse/infra/modules/warehouse.module';
import { InventoryModule } from '../modules/inventory/infra/modules/inventory.module';
import { ProductModule } from '../modules/product/infra/modules/product.module';
import { ReportModule } from '../modules/report/infra/modules/report.module';
import { StockMovementModule } from '../modules/stock-movement/infra/modules/stock-movement.module';

@Module({
  imports: [
    /* Módulos globais - configuração e infraestrutura compartilhada */
    ConfigModule.forRoot({ isGlobal: true }),
    SharedModule,

    /* Módulos específicos de domínio (ex: UserModule, ProductModule, etc.) */
    InventoryModule,
    ProductModule,
    ReportModule,
    StockMovementModule,
    WarehouseModule,
  ],
  controllers: [],
  providers: [
    /* Providers globais - pipes, filtros e interceptors */
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}

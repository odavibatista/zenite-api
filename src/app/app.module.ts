import {
  MiddlewareConsumer,
  Module,
  NestModule,
  ValidationPipe,
} from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from '../shared/infra/modules/shared.module';

@Module({
  imports: [
    /* Módulos globais - configuração e infraestrutura compartilhada */
    ConfigModule.forRoot({ isGlobal: true }),
    SharedModule,
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

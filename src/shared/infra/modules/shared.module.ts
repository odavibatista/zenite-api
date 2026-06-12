import { Global, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';


/* Módulo global responsável por infraestrutura e componentes compartilhados da aplicação */
@Global()
@Module({
  imports: [
    /* Imports - Configuração global de variáveis de ambiente (.env) */
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
  ],
  controllers: [
  ],
  providers: [

    /* Providers - Infraestrutura compartilhada */

    /* Pipe global de validação baseado em Zod, aplicado a todas as rotas */
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
  exports: [
    /* Exports - Providers compartilhados com outros módulos da aplicação */
  ],
})
export class SharedModule implements NestModule {
  /*
   * Método de configuração de middlewares do NestJS.
   * Atualmente não aplica nenhum middleware, mas é mantido para futura expansão
   * (ex.: middlewares globais de logging, tracing, etc. que possam ser compartilhados).
   */
  configure(consumer: MiddlewareConsumer) {}
}

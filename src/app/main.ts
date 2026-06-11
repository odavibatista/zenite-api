/**
 * Arquivo de bootstrap da aplicação NestJS.
 *
 * Responsável por:
 *  - carregar variáveis de ambiente (`dotenv`);
 *  - criar e configurar a aplicação Nest (CORS, logger, HTTPS opcional);
 *  - registrar a documentação da API (Swagger + Scalar API Reference);
 *  - iniciar o servidor HTTP na porta configurada.
 */
import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { cleanupOpenApiDoc } from 'nestjs-zod';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { sharedSwaggerConfig } from '../shared/config/swagger.config';
import { appConfigurations } from '../shared/config/app.config';
import { apiReference } from '@scalar/nestjs-api-reference';
import * as fs from 'fs';

/**
 * Função responsável por inicializar a aplicação NestJS.
 *
 * Fluxo:
 *  - cria a aplicação usando o `AppModule`;
 *  - habilita CORS para acesso via frontends externos;
 *  - aplica o patch do `nestjs-zod` para integração com Swagger;
 *  - gera o documento OpenAPI compartilhado;
 *  - registra a UI de documentação em `/docs` usando o Scalar API Reference;
 *  - inicia o listener HTTP na porta definida em `appConfigurations.PORT`.
 */
async function bootstrap() {

  // Cria a aplicação NestJS usando o `AppModule` como módulo raiz
  // e habilita logs detalhados em todos os níveis.
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
    // httpsOptions, // Descomente esta linha para subir a aplicação diretamente em HTTPS com os certificados acima.
  });

  // Habilita CORS para permitir chamadas da API a partir de diferentes origens (frontends, ferramentas externas, etc.).
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // Gera o documento OpenAPI da aplicação com base na configuração compartilhada de Swagger.
  const sharedDocument = SwaggerModule.createDocument(app, sharedSwaggerConfig);

  // Aplica o patch do `nestjs-zod` para integrar esquemas Zod com o Swagger/OpenAPI.
  cleanupOpenApiDoc(sharedDocument);

  // Registra a UI de documentação da API em `/docs` utilizando o Scalar API Reference,
  // consumindo o documento OpenAPI gerado acima.
  app.use(
    '/docs',
    apiReference({
      theme: 'deepSpace',
      spec: {
        content: sharedDocument,
      },
      metaData: {
        title: 'Zênite API',
        description: 'API da base de dados Agro Zênite',
      },
    } as any),
  );

  // Inicia o servidor HTTP na porta configurada (APP_PORT em `app.config`).
  await app.listen(appConfigurations.PORT);
}
// Executa o bootstrap da aplicação.
bootstrap();

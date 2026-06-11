// swagger.config.ts
// ------------------
// Módulo responsável por centralizar a configuração compartilhada do Swagger/OpenAPI
// para a aplicação.
//
// Utiliza o `DocumentBuilder` do @nestjs/swagger para:
//  - definir metadados básicos da API (título, descrição, versão);
//  - configurar o esquema de autenticação Bearer (JWT) utilizado nas rotas protegidas.

import { DocumentBuilder } from '@nestjs/swagger';

/**
 * Configuração base do Swagger/OpenAPI utilizada pela aplicação.
 *
 * Esta configuração pode ser reutilizada na inicialização do SwaggerModule
 * para gerar a documentação da API com:
 *  - título "Zênite API";
 *  - descrição da plataforma;
 *  - versão da API;
 *  - esquema de autenticação Bearer com JWT (`access-token`).
 */
export const sharedSwaggerConfig = new DocumentBuilder()
  .setTitle('Zênite API')
  .setDescription('API da base de dados Agro Zênite.')
  .setVersion('1.0.0')
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'API KEY',
      description: 'Insira a chave de API.',
    },
    'access-token',
  )
  .build();

import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { appConfigurations } from '../../config/app.config';
import { Environment } from '../../infra/utils/constants/enums/ENVIRONMENT';
import { PrismaClient } from '@prisma/client/extension';

/**
 * Provider de acesso ao banco via Prisma.
 *
 * - Estende `PrismaClient` para reutilizar todas as operações do Prisma.
 * - Integra com o ciclo de vida do NestJS (OnModuleInit/OnModuleDestroy)
 *   para conectar/desconectar automaticamente.
 * - Oferece utilitários para ambientes não-produtivos (seed/clear).
 */
@Injectable()
export class PrismaProvider
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  /**
   * Cria o client do Prisma configurando a URL do datasource.
   *
   * Em ambiente de teste (`TEST`), utiliza a `SHADOW_DATABASE_URL` para isolar
   * os dados e evitar impactos no banco principal.
   *
   * @param environment - Ambiente atual da aplicação (por padrão, NODE_ENV).
   */
  constructor(private environment: Environment = appConfigurations.NODE_ENV) {
    let datasourceUrl = appConfigurations.DATABASE_URL;
    super({
      datasourceUrl,
    });
  }

  /**
   * Hook do NestJS chamado ao inicializar o módulo.
   * Abre a conexão com o banco de dados.
   */
  async onModuleInit() {
    await this.$connect();
  }

  /**
   * Hook do NestJS chamado ao destruir o módulo.
   * Encerra a conexão com o banco de dados.
   */
  async onModuleDestroy() {
    await this.$disconnect();
  }

  /**
   * Executa uma lista de seeders para popular o banco com dados de teste/desenvolvimento.
   *
   * Este método é propositalmente bloqueado em produção por segurança.
   *
   * @param seeders - Funções que recebem a instância do Prisma e realizam inserções/atualizações.
   */
  async seed(seeders: ((prisma: PrismaClient) => Promise<void>)[]) {
    // Segurança: evita execução acidental de seeders em produção.
    if (this.environment === Environment.PRODUCTION) {
      throw new Error('This method is not allowed in production environment');
    }

    for (const seeder of seeders) {
      await seeder(this);
    }
  }

  /**
   * Limpa (TRUNCATE) tabelas informadas e reinicia as sequências/identidades.
   * Útil para cenários de testes e desenvolvimento.
   *
   * Este método é propositalmente bloqueado em produção por segurança.
   *
   * @param models - Lista de modelos (tabelas) a limpar ou `'all'` para limpar todos os modelos configurados.
   */
  async clear(models: string[] | 'all') {
    // Segurança: evita perda de dados em produção.
    if (this.environment === Environment.PRODUCTION) {
      throw new Error('This method is not allowed in production environment');
    }

    const allModels = [
      // "categories",
      // "insurance_companies",
      // "administrator_permissions",
      // "administrators",
      // "cryptography_directives",
      // "cryptography_keys",
      // "cryptography_algorythms",
      // "users",
      // "ibge_cities",
      // "ufs",
    ];

    const modelsToClear = models === 'all' ? allModels : models;

    for (const model of modelsToClear) {
      await this.$queryRawUnsafe(
        `TRUNCATE TABLE "${model}" RESTART IDENTITY CASCADE;`,
      );
    }
  }
}

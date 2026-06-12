import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

import { appConfigurations } from '../../config/app.config';
import { Environment } from '../utils/constants/enums/ENVIRONMENT';

@Injectable()
export class PrismaProvider
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(
    private environment: Environment = appConfigurations.NODE_ENV,
  ) {
    const adapter = new PrismaPg({
      connectionString: appConfigurations.DATABASE_URL,
    });

    super({
      adapter,
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  async seed(
    seeders: ((prisma: PrismaClient) => Promise<void>)[],
  ) {
    if (this.environment === Environment.PRODUCTION) {
      throw new Error(
        'This method is not allowed in production enviroment',
      );
    }

    for (const seeder of seeders) {
      await seeder(this);
    }
  }
}
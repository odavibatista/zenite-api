import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ReportController } from '../../http/controllers/report.controller';
import { ReportRepository } from '../db/repositories/report.repository';

@Module({
    controllers: [ReportController],
    providers: [
        ReportRepository,
    ],
  })
export class ReportModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply().forRoutes();
  }
}
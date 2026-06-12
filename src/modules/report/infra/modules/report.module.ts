import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ReportController } from '../../http/controllers/report.controller';
import { ReportRepository } from '../db/repositories/report.repository';
import { AuthenticationMiddleware } from 'src/shared/http/middlewares/Auth.middleware';

@Module({
  controllers: [ReportController],
  providers: [ReportRepository],
})
export class ReportModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticationMiddleware).forRoutes({
      method: RequestMethod.ALL,
      path: '/reports/*path',
    });
  }
}

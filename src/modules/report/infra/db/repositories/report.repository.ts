import { Injectable } from '@nestjs/common';
import { ReportRepositoryInterface } from 'src/modules/report/domain/dtos/repositories/report.repository.interface';

@Injectable()
export class ReportRepository implements ReportRepositoryInterface {}

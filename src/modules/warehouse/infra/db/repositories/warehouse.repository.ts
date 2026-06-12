import { Injectable } from '@nestjs/common';
import { WarehouseRepositoryInterface } from 'src/modules/warehouse/domain/dtos/repositories/warehouse.repository.interface';

@Injectable()
export class WarehouseRepository implements WarehouseRepositoryInterface {}

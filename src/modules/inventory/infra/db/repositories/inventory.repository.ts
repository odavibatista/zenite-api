import { Injectable } from '@nestjs/common';
import { InventoryRepositoryInterface } from 'src/modules/inventory/domain/dtos/repositories/inventory.repository.interface';

@Injectable()
export class InventoryRepository implements InventoryRepositoryInterface {}

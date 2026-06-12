import { FindInventoryByIdDto } from './FindInventoryById.dto';

export interface InventoryRepositoryInterface {
  findAll(): Promise<FindInventoryByIdDto[]>;

  findById(id: string): Promise<FindInventoryByIdDto | null>;

  findCritical(): Promise<FindInventoryByIdDto[]>;

  findExpiring(): Promise<FindInventoryByIdDto[]>;
}

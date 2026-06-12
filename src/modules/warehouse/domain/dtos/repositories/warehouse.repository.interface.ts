import { FindWarehouseByIdDto } from './FindWarehouseById.dto';

export interface WarehouseRepositoryInterface {
  findAll(): Promise<FindWarehouseByIdDto[]>;

  findById(id: string): Promise<FindWarehouseByIdDto | null>;

  findByCode(code: string): Promise<FindWarehouseByIdDto | null>;
}

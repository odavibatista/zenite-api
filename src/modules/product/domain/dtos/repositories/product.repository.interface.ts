import { FindProductByIdDto } from "src/modules/product/infra/db/repositories/dtos/FindProductById.dto";

export interface ProductRepositoryInterface {

  findAll(): Promise<FindProductByIdDto[]>;

  findById(id: string): Promise<FindProductByIdDto | null>;

  findByName(name: string): Promise<FindProductByIdDto | null>;
}

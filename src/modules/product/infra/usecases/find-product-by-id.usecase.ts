import { UseCaseInterface } from "src/shared/domain/protocols/UseCase.protocol";
import { ProductRepository } from "../db/repositories/product.repository";
import { Inject } from "@nestjs/common";
import { FindProductByIdResponse } from "../../domain/dtos/requests/FindProductById.request.dto";
import { ProductNotFoundException } from "../../domain/dtos/errors/ProductNotFoundException.exception";

export class FindProductByIdUsecase implements UseCaseInterface {
        constructor(
            @Inject()
            private productRepository: ProductRepository,
          ) {}
    
          async execute(id: string): Promise<FindProductByIdResponse | ProductNotFoundException> {
            const product = await this.productRepository.findById(id)

            if (!product) throw new ProductNotFoundException()

            return product
          }
}
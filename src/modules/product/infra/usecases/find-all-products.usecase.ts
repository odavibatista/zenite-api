import { Inject } from "@nestjs/common";
import { UseCaseInterface } from "src/shared/domain/protocols/UseCase.protocol";
import { ProductRepository } from "../db/repositories/product.repository";
import { FindAllProductsResponseDTO } from "../../domain/dtos/requests/FindAllProducts.request.dto";
import { SeasonProvider } from "src/shared/infra/providers/Season.provider";

export class FindAllProductsUsecase implements UseCaseInterface {
    constructor(
        @Inject()
        private productRepository: ProductRepository,
        private seasonProvider: SeasonProvider,
      ) {}

      async execute(): Promise<FindAllProductsResponseDTO> {
        const products = await this.productRepository.findAll();

        return {
            products,
            current_season: this.seasonProvider.getCurrentSeason(),
        }
      }
}
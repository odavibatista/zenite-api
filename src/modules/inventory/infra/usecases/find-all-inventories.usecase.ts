import { Inject, Injectable } from '@nestjs/common';

import { UseCaseInterface } from 'src/shared/domain/protocols/UseCase.protocol';

import { InventoryRepository } from '../db/repositories/inventory.repository';
import { FindAllInventoriesResponseDTO } from '../../domain/dtos/requests/FindAllInventories.request.dto';
import { SeasonProvider } from 'src/shared/infra/providers/Season.provider';

@Injectable()
export class FindAllInventoriesUsecase implements UseCaseInterface {
  constructor(
    @Inject()
    private readonly inventoryRepository: InventoryRepository,
    private seasonProvider: SeasonProvider,
  ) {}

  async execute(): Promise<FindAllInventoriesResponseDTO> {
    const inventories = (await this.inventoryRepository.findAll()).map(
      (inventory) => ({
        id: inventory.id,
        product: {
          id: inventory.productId,
          name: inventory.productName,
          category: inventory.productCategory,
          minimumStock: inventory.productMinimumStock,
          expirationDate: inventory.productExpirationDate,
        },
        warehouse: {
          id: inventory.warehouseId,
          code: inventory.warehouseCode,
          name: inventory.warehouseName,
          city: inventory.warehouseCity,
          state: inventory.warehouseState,
        },
        quantity: inventory.quantity,
        isCritical: inventory.isCritical,
        isExpired: inventory.isExpired,
        createdAt: inventory.createdAt,
        updatedAt: inventory.updatedAt,
        monthlyStorageCost: inventory.monthlyStorageCost,
      }),
    );

    return {
      inventories,
      current_season: this.seasonProvider.getCurrentSeason(),
    };
  }
}

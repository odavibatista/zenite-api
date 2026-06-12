import { Injectable } from '@nestjs/common';
import { FindInventoryByIdDto } from 'src/modules/inventory/domain/dtos/repositories/FindInventoryById.dto';
import { InventoryRepositoryInterface } from 'src/modules/inventory/domain/dtos/repositories/inventory.repository.interface';
import { prisma } from '../../../../../shared/infra/db/prisma';
import { Inventory } from '@prisma/client';
import { FindAllInventoriesDto } from './FindAllInventories.dto';

@Injectable()
export class InventoryRepository implements InventoryRepositoryInterface {
    async findAll(): Promise<FindAllInventoriesDto[]> {
        const inventories = await prisma.inventory.findMany({
          include: {
            product: true,
            warehouse: true,
          },
        });
      
        return inventories.map((inventory) => ({
          id: inventory.id,
      
          productId: inventory.product.id,
          productName: inventory.product.name,
          productCategory: inventory.product.category,
          productMinimumStock: inventory.product.minimumStock,
          productExpirationDate:
            inventory.product.expirationDate.toISOString(),
      
          warehouseId: inventory.warehouse.id,
          warehouseCode: inventory.warehouse.code,
          warehouseName: inventory.warehouse.name,
          warehouseCity: inventory.warehouse.city,
          warehouseState: inventory.warehouse.state,
      
          quantity: inventory.quantity,
      
          monthlyStorageCost: Number(
            inventory.monthlyStorageCost,
          ),
      
          isCritical:
            inventory.quantity <
            inventory.product.minimumStock,
      
          isExpired:
            inventory.product.expirationDate <
            new Date(),
      
          createdAt: inventory.createdAt.toISOString(),
          updatedAt: inventory.updatedAt.toISOString(),
        }));
      }

    async findById(id: string): Promise<FindInventoryByIdDto | null> {
        const inventory = await prisma.inventory.findUnique({
            where: { id },
        });

        if (!inventory) {
            return null;
        }

        return {
            ...inventory,
            createdAt: inventory.createdAt.toISOString(),
            updatedAt: inventory.updatedAt.toISOString(),
            monthlyStorageCost: inventory.monthlyStorageCost.toNumber(),
        };
    }

    async findCritical(): Promise<FindInventoryByIdDto[]> {
        const inventories = await prisma.inventory.findMany({
            where: {
                quantity: {
                    lte: 10, // Assuming critical inventory is defined as quantity less than or equal to 10
                },
            },
        });

        return inventories.map((inv) => ({
            ...inv,
            createdAt: inv.createdAt.toISOString(),
            updatedAt: inv.updatedAt.toISOString(),
            monthlyStorageCost: inv.monthlyStorageCost.toNumber(),
        }));
    }

    async findExpiring(): Promise<FindInventoryByIdDto[]> {
        const today = new Date();
        const nextMonth = new Date();
        nextMonth.setMonth(today.getMonth() + 1);

        const inventories = await prisma.inventory.findMany({
            where: {
                product: {
                    expirationDate: {
                        gte: today,
                        lte: nextMonth,
                    },
                },
            },
        });

        return inventories.map((inv) => ({
            ...inv,
            createdAt: inv.createdAt.toISOString(),
            updatedAt: inv.updatedAt.toISOString(),
            monthlyStorageCost: inv.monthlyStorageCost.toNumber(),
        }));
    }
}

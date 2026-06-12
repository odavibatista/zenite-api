import { Injectable } from '@nestjs/common';
import { FindWarehouseByIdDto } from 'src/modules/warehouse/domain/dtos/repositories/FindWarehouseById.dto';
import { WarehouseRepositoryInterface } from 'src/modules/warehouse/domain/dtos/repositories/warehouse.repository.interface';

import { prisma } from 'src/shared/infra/db/prisma';

@Injectable()
export class WarehouseRepository implements WarehouseRepositoryInterface {
  async findAll(): Promise<FindWarehouseByIdDto[]> {
    const warehouses = await prisma.warehouse.findMany({
      orderBy: {
        name: 'asc',
      },
    });

    return warehouses.map((warehouse) => ({
      id: warehouse.id,
      code: warehouse.code,
      name: warehouse.name,
      city: warehouse.city,
      state: warehouse.state,
      createdAt: warehouse.createdAt.toISOString(),
    }));
  }

  async findById(id: string): Promise<FindWarehouseByIdDto | null> {
    const warehouse = await prisma.warehouse.findUnique({
      where: {
        id,
      },
    });

    if (!warehouse) {
      return null;
    }

    return {
      id: warehouse.id,
      code: warehouse.code,
      name: warehouse.name,
      city: warehouse.city,
      state: warehouse.state,
      createdAt: warehouse.createdAt.toISOString(),
    };
  }

  async findByCode(code: string): Promise<FindWarehouseByIdDto | null> {
    const warehouse = await prisma.warehouse.findUnique({
      where: {
        code,
      },
    });

    if (!warehouse) {
      return null;
    }

    return {
      id: warehouse.id,
      code: warehouse.code,
      name: warehouse.name,
      city: warehouse.city,
      state: warehouse.state,
      createdAt: warehouse.createdAt.toISOString(),
    };
  }
}

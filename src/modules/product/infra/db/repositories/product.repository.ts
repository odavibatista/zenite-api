import { Injectable } from '@nestjs/common';
import { ProductRepositoryInterface } from 'src/modules/product/domain/dtos/repositories/product.repository.interface';
import { prisma } from '../../../../../shared/infra/db/prisma';
import { Product } from '@prisma/client';
import { FindProductByIdDto } from './dtos/FindProductById.dto';

@Injectable()
export class ProductRepository implements ProductRepositoryInterface {
  async findAll(): Promise<FindProductByIdDto[]> {
    const products = prisma.product.findMany();

    const formattedProducts = (await products).map((product: Product) => ({
      ...product,
      expirationDate: product.expirationDate.toISOString(),
      createdAt: product.createdAt.toISOString(),
      updatedAt: product.updatedAt.toISOString(),
    }));

    return formattedProducts;
  }

  async findById(id: string): Promise<FindProductByIdDto | null> {
    const product = await prisma.product.findUnique({
      where: {
        id,
      },
    });

    if (!product)
      return null;

    return {
      ...product,
      expirationDate: product.expirationDate.toISOString(),
      createdAt: product.createdAt.toISOString(),
      updatedAt: product.updatedAt.toISOString(),
    }
  }

  async findByName(name: string): Promise<FindProductByIdDto | null> {
    const product = await prisma.product.findFirst({
      where: {
        name,
      },
    });

    if (!product)
      return null;

    return {
      ...product,
      expirationDate: product.expirationDate.toISOString(),
      createdAt: product.createdAt.toISOString(),
      updatedAt: product.updatedAt.toISOString(),
    }
  }
}

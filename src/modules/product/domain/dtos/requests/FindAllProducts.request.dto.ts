import { createZodDto } from 'nestjs-zod';
import z from 'zod';

export const ProductSchema = z.object({
  id: z.uuid(),

  name: z.string(),

  category: z.string(),

  minimumStock: z.number().int(),

  expirationDate: z.string(),

  createdAt: z.string(),

  updatedAt: z.string(),
});

export const FindAllProductsResponseSchema = z.object({
  current_season: z.enum(['spring', 'summer', 'autumn', 'winter']),

  products: z.array(ProductSchema),
});

export class FindAllProductsResponseDTO extends createZodDto(
  FindAllProductsResponseSchema,
) {}

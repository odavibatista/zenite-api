import { createZodDto } from 'nestjs-zod';
import z from 'zod';

export const FindInventoryByIdSchema = z.object({
  id: z.uuid(),

  productId: z.uuid(),

  warehouseId: z.uuid(),

  quantity: z.number().int(),

  monthlyStorageCost: z.number(),

  createdAt: z.string(),

  updatedAt: z.string(),
});

export class FindInventoryByIdDto extends createZodDto(
  FindInventoryByIdSchema,
) {}
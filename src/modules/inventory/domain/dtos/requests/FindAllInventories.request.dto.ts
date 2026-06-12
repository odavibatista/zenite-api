import { createZodDto } from 'nestjs-zod';
import z from 'zod';

export const InventorySchema = z.object({
  id: z.uuid(),

  product: z.object({
    id: z.uuid(),

    name: z.string(),

    category: z.string(),

    minimumStock: z.number().int(),

    expirationDate: z.string(),
  }),

  warehouse: z.object({
    id: z.uuid(),

    code: z.string(),

    name: z.string(),

    city: z.string(),

    state: z.string(),
  }),

  quantity: z.number().int(),

  monthlyStorageCost: z.number(),

  isCritical: z.boolean(),

  isExpired: z.boolean(),

  createdAt: z.string(),

  updatedAt: z.string(),
});

export const FindAllInventoriesResponseSchema = z.object({
  current_season: z.enum(['spring', 'summer', 'autumn', 'winter']),

  inventories: z.array(InventorySchema),
});

export class FindAllInventoriesResponseDTO extends createZodDto(
  FindAllInventoriesResponseSchema,
) {}

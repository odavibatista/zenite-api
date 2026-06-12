import { createZodDto } from 'nestjs-zod';
import z from 'zod';

export const FindAllInventoriesSchema = z.object({
  id: z.uuid(),

  productId: z.uuid(),
  productName: z.string(),
  productCategory: z.string(),
  productMinimumStock: z.number().int(),
  productExpirationDate: z.string(),

  warehouseId: z.uuid(),
  warehouseCode: z.string(),
  warehouseName: z.string(),
  warehouseCity: z.string(),
  warehouseState: z.string(),

  quantity: z.number().int(),

  monthlyStorageCost: z.number(),

  isCritical: z.boolean(),
  isExpired: z.boolean(),

  createdAt: z.string(),
  updatedAt: z.string(),
});

export class FindAllInventoriesDto extends createZodDto(
  FindAllInventoriesSchema,
) {}

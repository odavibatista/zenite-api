import { createZodDto } from 'nestjs-zod';
import z from 'zod';

export const FindWarehouseByIdSchema = z.object({
  id: z.uuid(),

  code: z.string(),

  name: z.string(),

  city: z.string(),

  state: z.string(),

  createdAt: z.string(),
});

export class FindWarehouseByIdDto extends createZodDto(
  FindWarehouseByIdSchema,
) {}

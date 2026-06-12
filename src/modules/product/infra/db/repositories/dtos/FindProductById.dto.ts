import { createZodDto } from 'nestjs-zod';
import z from 'zod';

export const FindProductByIdSchema = z.object({
  id: z.uuid(),

  name: z.string(),

  category: z.string(),

  minimumStock: z.number().int(),

  expirationDate: z.date(),

  createdAt: z.date(),

  updatedAt: z.date(),
});

export class FindProductByIdDto extends createZodDto(FindProductByIdSchema) {}

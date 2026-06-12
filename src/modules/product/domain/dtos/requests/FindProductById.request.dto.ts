import { createZodDto } from 'nestjs-zod';
import z from 'zod';

export const FindProductByIdResponseSchema = z.object({
  id: z.uuid(),

  name: z.string(),

  category: z.string(),

  minimumStock: z.number().int(),

  expirationDate: z.date(),

  createdAt: z.date(),

  updatedAt: z.date(),
});

export class FindProductByIdResponse extends createZodDto(FindProductByIdResponseSchema) {}
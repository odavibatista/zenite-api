import { createZodDto } from 'nestjs-zod';
import z from 'zod';

import { FindProductByIdSchema } from './FindProductById.dto';

export const FindAllProductsSchema = z.array(FindProductByIdSchema);

export class FindAllProductsDto extends createZodDto(FindAllProductsSchema) {}

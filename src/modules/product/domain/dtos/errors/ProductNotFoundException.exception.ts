import { HttpException } from '@nestjs/common';

export class ProductNotFoundException extends HttpException {
  constructor() {
    super('Produto.', 404);
  }
}
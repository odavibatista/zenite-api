import { HttpException } from '@nestjs/common';

export class InvalidCredentialsException extends HttpException {
  constructor() {
    super('Credenciais inválidas.', 400);
  }
}

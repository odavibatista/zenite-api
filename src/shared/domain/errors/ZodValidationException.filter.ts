import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { ZodValidationException } from 'nestjs-zod';

@Catch(ZodValidationException)
export class ZodValidationExceptionFilter implements ExceptionFilter {
  catch(exception: ZodValidationException, host: ArgumentsHost) {
    const errorMessage = exception.message;
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    response.status(422).json({
      statusCode: 422,
      message: errorMessage,
    });
  }
}

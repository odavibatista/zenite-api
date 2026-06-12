import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

import { InvalidCredentialsException } from 'src/shared/domain/errors/InvalidCredentials.exception';
import { NotAuthenticatedException } from 'src/shared/domain/errors/NotAuthenticated.exception';
import { appConfigurations } from 'src/shared/config/app.config';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  use(req: Request, _res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new NotAuthenticatedException();
    }

    const [scheme, token] = authHeader.split(' ');

    if (scheme !== 'Bearer' || !token) {
      throw new NotAuthenticatedException();
    }

    if (token !== appConfigurations.API_KEY) {
      throw new InvalidCredentialsException();
    }

    return next();
  }
}

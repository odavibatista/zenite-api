import { Controller, Get, HttpException, Req, Res } from '@nestjs/common';

import type { Request, Response } from 'express';

import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { AllExceptionsFilterDTO } from 'src/shared/domain/dtos/errors/AllException.filter.dto';
import { InvalidCredentialsException } from 'src/shared/domain/errors/InvalidCredentials.exception';
import { NotAuthenticatedException } from 'src/shared/domain/errors/NotAuthenticated.exception';

import { InventoryControllerInterface } from '../../domain/dtos/controllers/inventory.controller.interface';
import { FindAllInventoriesUsecase } from '../../infra/usecases/find-all-inventories.usecase';
import { FindAllInventoriesResponseDTO } from '../../domain/dtos/requests/FindAllInventories.request.dto';

@ApiTags('Inventário')
@Controller('inventory')
export class InventoryController implements InventoryControllerInterface {
  constructor(
    private readonly findAllInventoriesUsecase: FindAllInventoriesUsecase,
  ) {}

  @Get('/browse-inventory')
  @ApiBearerAuth('access-token')
  @ApiOkResponse({
    description: 'Inventário e Estação Atual retornados com sucesso.',
    type: FindAllInventoriesResponseDTO,
  })
  @ApiBadRequestResponse({
    description: new InvalidCredentialsException().message,
    type: AllExceptionsFilterDTO,
  })
  @ApiUnauthorizedResponse({
    description: new NotAuthenticatedException().message,
    type: AllExceptionsFilterDTO,
  })
  @ApiOperation({
    summary: 'Buscar Estado do Inventário',
    description:
      'Endpoint responsável por retornar todos os produtos em estoque, seus respectivos armazéns, indicadores de criticidade, validade e a estação atual.',
  })
  async findInventories(
    @Req()
    req: Request,
    @Res()
    res: Response,
  ): Promise<Response> {
    const result = await this.findAllInventoriesUsecase.execute();

    if (result instanceof HttpException)
      return res.status(result.getStatus()).json({
        statusCode: result.getStatus(),
        message: result.message,
      });

    return res.status(200).json(result);
  }
}

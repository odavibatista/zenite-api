import { Controller, Get, HttpException, Req, Res } from '@nestjs/common';
import { ProductControllerInterface } from '../../domain/dtos/controllers/product.controller.interface';
import type { Request, Response } from 'express';
import { FindAllProductsUsecase } from '../../infra/usecases/find-all-products.usecase';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AllExceptionsFilterDTO } from 'src/shared/domain/dtos/errors/AllException.filter.dto';
import { NotAuthenticatedException } from 'src/shared/domain/errors/NotAuthenticated.exception';
import { InvalidCredentialsException } from 'src/shared/domain/errors/InvalidCredentials.exception';
import { FindAllProductsResponseDTO } from '../../domain/dtos/requests/FindAllProducts.request.dto';

@ApiTags('Produtos')
@Controller('products')
export class ProductController implements ProductControllerInterface {
  constructor(
    private readonly findAllProductsUsecase: FindAllProductsUsecase,
  ) {}

  @Get('/browse-products')
  @ApiBearerAuth('access-token')
  @ApiOkResponse({
    description: 'Produtos e Estação Trazidos com Sucesso.',
    type: FindAllProductsResponseDTO,
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
    summary: 'Buscar Produtos Disponíveis',
    description:
      'Endpoint para buscar todos os produtos disponíveis, incluindo informações sobre a estação atual.',
  })
  async findProducts(
    @Req()
    req: Request,
    @Res() res: Response,
  ): Promise<Response> {
    const result = await this.findAllProductsUsecase.execute();

    if (result instanceof HttpException)
      return res.status(result.getStatus()).json({
        statusCode: result.getStatus(),
        message: result.message,
      });

    return res.status(201).json(result);
  }
}

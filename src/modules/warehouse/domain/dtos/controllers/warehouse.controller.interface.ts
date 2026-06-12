import { Request, Response } from 'express';

export interface WarehouseControllerInterface {
  findWarehouses(req: Request, res: Response): Promise<Response>;

  findWarehouseById(
    req: Request,
    res: Response,
  ): Promise<Response>;
}
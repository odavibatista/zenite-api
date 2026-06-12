import { Request, Response } from 'express';

export interface ProductControllerInterface {
  findProducts(req: Request, res: Response): Promise<Response>;
}

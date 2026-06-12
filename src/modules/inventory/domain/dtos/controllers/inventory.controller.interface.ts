import { Request, Response } from 'express';

export interface  InventoryControllerInterface {
  findInventories(req: Request, res: Response): Promise<Response>;
}
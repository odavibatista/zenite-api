import { Controller } from '@nestjs/common';
import { InventoryControllerInterface } from '../../domain/dtos/controllers/inventory.controller.interface';
import { Request, Response } from 'express';

@Controller('inventory')
export class InventoryController implements InventoryControllerInterface {
}

import { Injectable } from "@nestjs/common";
import { StockMovementRepositoryInterface } from "src/modules/stock-movement/domain/dtos/repositories/stock-movement.repository.interface";

@Injectable()
export class StockMovementRepository implements StockMovementRepositoryInterface {}

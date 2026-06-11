import { StockMovementRepository } from './stock-movement.repository';

describe('StockMovementRepository', () => {
  it('should be defined', () => {
    expect(new StockMovementRepository()).toBeDefined();
  });
});

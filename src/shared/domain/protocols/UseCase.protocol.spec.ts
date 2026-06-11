import { UseCaseInterface } from './UseCase.protocol';

describe('UseCaseInterface', () => {
  it('should define the execute method', () => {
    const useCase: UseCaseInterface = {
      execute: jest.fn(),
    };

    expect(useCase.execute).toBeDefined();
    expect(typeof useCase.execute).toBe('function');
  });
});

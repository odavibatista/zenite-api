import { UnprocessableDataException } from './UnprocessableData.exception';

describe('UnprocessableDataException', () => {
  it('should create UnprocessableDataException correctly', () => {
    const exception = new UnprocessableDataException();

    expect(exception).toBeInstanceOf(UnprocessableDataException);
    expect(exception.getStatus()).toBe(422);
    expect(exception.message).toBe('Erro de validação de dados. ');
  });
});

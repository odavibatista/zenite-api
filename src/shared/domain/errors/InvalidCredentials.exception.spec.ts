import { InvalidCredentialsException } from './InvalidCredentials.exception';

describe('InvalidCredentialsException', () => {
  it('should create InvalidCredentialsException correctly', () => {
    const exception = new InvalidCredentialsException();

    expect(exception).toBeInstanceOf(InvalidCredentialsException);
    expect(exception.getStatus()).toBe(400);
    expect(exception.message).toBe('Credenciais inválidas.');
  });
});

import { NotAuthenticatedException } from './NotAuthenticated.exception';

describe('NotAuthenticatedException', () => {
  it('should create NotAuthenticatedException correctly', () => {
    const exception = new NotAuthenticatedException();

    expect(exception).toBeInstanceOf(NotAuthenticatedException);
    expect(exception.getStatus()).toBe(401);
    expect(exception.message).toBe(
      'Você precisa estar logado para acessar este recurso.',
    );
  });
});

import { ZodError } from 'zod';
import { EnvironmentException } from './Environment.exception';

describe('EnvironmentException', () => {
  it('should create EnvironmentException correctly', () => {
    const error: ZodError = new ZodError([]);

    const exception = new EnvironmentException(error);

    expect(exception).toBeInstanceOf(EnvironmentException);
    expect(exception.message).toBe('');
  });

  it('should build a concatenated message from ZodError issues', () => {
    const errorWithIssues = new ZodError([
      {
        path: ['DATABASE_URL'],
        message: 'is required',
        code: 'custom',
      } as any,
      {
        path: ['NODE_ENV'],
        message: 'is invalid',
        code: 'custom',
      } as any,
    ]);

    const exception = new EnvironmentException(errorWithIssues);

    expect(exception).toBeInstanceOf(EnvironmentException);
    expect(exception.message).toBe(
      'DATABASE_URL is required\nNODE_ENV is invalid',
    );
  });
});

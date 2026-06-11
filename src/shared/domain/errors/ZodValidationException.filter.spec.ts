import { ZodValidationExceptionFilter } from './ZodValidationException.filter';
import { ZodValidationException } from 'nestjs-zod';

/**
 * NOTE: Test descriptions must remain in English.
 */

describe('ZodValidationExceptionFilter', () => {
  const makeHttpHost = () => {
    const response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    const host = {
      switchToHttp: () => ({
        getResponse: () => response,
      }),
    } as any;

    return { host, response };
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create an instance of ZodValidationExceptionFilter', () => {
    const filter = new ZodValidationExceptionFilter();

    expect(filter).toBeInstanceOf(ZodValidationExceptionFilter);
  });

  it('should respond with status 422 and the exception message', () => {
    const filter = new ZodValidationExceptionFilter();
    const { host, response } = makeHttpHost();

    const exception = {
      message: 'Invalid payload',
    } as unknown as ZodValidationException;

    filter.catch(exception, host);

    expect(response.status).toHaveBeenCalledTimes(1);
    expect(response.status).toHaveBeenCalledWith(422);

    expect(response.json).toHaveBeenCalledTimes(1);
    expect(response.json).toHaveBeenCalledWith({
      statusCode: 422,
      message: 'Invalid payload',
    });
  });
});

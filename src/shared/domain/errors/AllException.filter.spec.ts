import { AllExceptionsFilter } from './AllException.filter';
import { ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';

describe('AllExceptionsFilter', () => {
  it('should create an instance of AllExceptionsFilter', () => {
    const filter = new AllExceptionsFilter();

    expect(filter).toBeInstanceOf(AllExceptionsFilter);
  });

  it('should handle HttpException and respond with its status and message', async () => {
    const filter = new AllExceptionsFilter();

    const mockJson = jest.fn();
    const mockStatus = jest.fn().mockReturnValue({ json: mockJson });
    const mockResponse = { status: mockStatus };
    const mockRequest = { url: '/test-url' };

    const mockHttpArgumentsHost = {
      getResponse: () => mockResponse,
      getRequest: () => mockRequest,
    };

    const mockHost = {
      switchToHttp: () => mockHttpArgumentsHost,
    } as unknown as ArgumentsHost;

    const exception = new HttpException('Custom error', HttpStatus.BAD_REQUEST);

    await filter.catch(exception, mockHost);

    expect(mockStatus).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
    expect(mockJson).toHaveBeenCalledTimes(1);

    const responseBody = mockJson.mock.calls[0][0];

    expect(responseBody).toMatchObject({
      message: 'Custom error',
      statusCode: HttpStatus.BAD_REQUEST,
      path: '/test-url',
    });
    expect(responseBody).toHaveProperty('timestamp');
    expect(typeof responseBody.timestamp).toBe('string');
  });

  it('should handle generic Error and respond with 500 status', async () => {
    const filter = new AllExceptionsFilter();

    const mockJson = jest.fn();
    const mockStatus = jest.fn().mockReturnValue({ json: mockJson });
    const mockResponse = { status: mockStatus };
    const mockRequest = { url: '/generic-error' };

    const mockHttpArgumentsHost = {
      getResponse: () => mockResponse,
      getRequest: () => mockRequest,
    };

    const mockHost = {
      switchToHttp: () => mockHttpArgumentsHost,
    } as unknown as ArgumentsHost;

    const exception = new Error('Generic error');

    await filter.catch(exception, mockHost);

    expect(mockStatus).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR);
    expect(mockJson).toHaveBeenCalledTimes(1);

    const responseBody = mockJson.mock.calls[0][0];

    expect(responseBody).toMatchObject({
      message: 'Generic error',
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      path: '/generic-error',
    });
    expect(responseBody).toHaveProperty('timestamp');
  });

  it('should handle non-Error exceptions and respond with default message and 500 status', async () => {
    const filter = new AllExceptionsFilter();

    const mockJson = jest.fn();
    const mockStatus = jest.fn().mockReturnValue({ json: mockJson });
    const mockResponse = { status: mockStatus };
    const mockRequest = { url: '/non-error' };

    const mockHttpArgumentsHost = {
      getResponse: () => mockResponse,
      getRequest: () => mockRequest,
    };

    const mockHost = {
      switchToHttp: () => mockHttpArgumentsHost,
    } as unknown as ArgumentsHost;

    const exception = { unexpected: 'object' }; // not an instance of Error

    await filter.catch(exception, mockHost);

    expect(mockStatus).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR);
    expect(mockJson).toHaveBeenCalledTimes(1);

    const responseBody = mockJson.mock.calls[0][0];

    expect(responseBody).toMatchObject({
      message: 'Internal Server Error',
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      path: '/non-error',
    });
    expect(responseBody).toHaveProperty('timestamp');
  });
});

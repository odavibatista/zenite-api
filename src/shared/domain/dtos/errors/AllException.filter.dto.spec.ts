import {
  AllExceptionFilterSchema,
  AllExceptionsFilterDTO,
} from './AllException.filter.dto';

describe('AllExceptionsFilterDTO', () => {
  it('should create AllExceptionsFilterDTO correctly', () => {
    const dto: AllExceptionsFilterDTO = {
      message: 'Erro de teste',
      statusCode: 500,
      timestamp: new Date().toISOString(),
    };

    expect(dto).toHaveProperty('message', 'Erro de teste');
    expect(dto).toHaveProperty('statusCode', 500);
    expect(dto).toHaveProperty('timestamp');
  });

  it('should match the AllExceptionFilterSchema', () => {
    const dto: AllExceptionsFilterDTO = {
      message: 'Erro de teste',
      statusCode: 400,
      timestamp: new Date().toISOString(),
    };

    const parsed = AllExceptionFilterSchema.parse(dto);

    expect(parsed).toEqual(dto);
  });
});

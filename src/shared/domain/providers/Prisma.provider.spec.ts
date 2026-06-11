import { Environment } from '../../config/app.config';
import { PrismaProvider } from './Prisma.provider';

jest.mock('@prisma/client', () => {
  class MockPrismaClient {
    $connect = jest.fn();
    $disconnect = jest.fn();
    $queryRawUnsafe = jest.fn();
    constructor() {}
  }

  return { PrismaClient: MockPrismaClient };
});

describe('PrismaProvider', () => {
  let prismaProvider: PrismaProvider;
  beforeEach(() => {
    prismaProvider = new PrismaProvider(Environment.TEST);
  });
  beforeAll(() => {
    prismaProvider = new PrismaProvider();
  });

  it('should be defined', () => {
    expect(prismaProvider).toBeDefined();
  });

  it('should call $connect on module init', async () => {
    const connectSpy = jest
      .spyOn(prismaProvider, '$connect')
      .mockResolvedValue(undefined as any);

    await prismaProvider.onModuleInit();

    expect(connectSpy).toHaveBeenCalledTimes(1);
  });

  it('should call $disconnect on module destroy', async () => {
    const disconnectSpy = jest
      .spyOn(prismaProvider, '$disconnect')
      .mockResolvedValue(undefined as any);

    await prismaProvider.onModuleDestroy();

    expect(disconnectSpy).toHaveBeenCalledTimes(1);
  });
  it('should execute all seeders when not in production', async () => {
    const seeder1 = jest.fn().mockResolvedValue(undefined);
    const seeder2 = jest.fn().mockResolvedValue(undefined);

    await prismaProvider.seed([seeder1, seeder2]);

    expect(seeder1).toHaveBeenCalledWith(prismaProvider);
    expect(seeder2).toHaveBeenCalledWith(prismaProvider);
  });
  it('should throw when calling seed in production environment', async () => {
    const prodProvider = new PrismaProvider(Environment.PRODUCTION);

    await expect(prodProvider.seed([])).rejects.toThrow(
      'This method is not allowed in production environment',
    );
  });

  it('should truncate only provided models when clearing in non-production', async () => {
    const queryRawSpy = jest
      .spyOn(prismaProvider, '$queryRawUnsafe')
      .mockResolvedValue(undefined as any);

    await prismaProvider.clear(['users', 'categories']);

    expect(queryRawSpy).toHaveBeenCalledTimes(2);
    expect(queryRawSpy).toHaveBeenCalledWith(
      'TRUNCATE TABLE "users" RESTART IDENTITY CASCADE;',
    );
    expect(queryRawSpy).toHaveBeenCalledWith(
      'TRUNCATE TABLE "categories" RESTART IDENTITY CASCADE;',
    );
  });

  it('should handle clear with "all" models without throwing', async () => {
    const queryRawSpy = jest
      .spyOn(prismaProvider, '$queryRawUnsafe')
      .mockResolvedValue(undefined as any);

    await expect(prismaProvider.clear('all')).resolves.not.toThrow();
    // Como allModels está vazio, não chama queryRaw, mas o branch é executado
    expect(queryRawSpy).not.toHaveBeenCalled();
  });

  it('should throw when calling clear in production environment', async () => {
    const prodProvider = new PrismaProvider(Environment.PRODUCTION);

    await expect(prodProvider.clear(['users'])).rejects.toThrow(
      'This method is not allowed in production environment',
    );
  });
});

import { DateProviderInterface } from './Date.provider';

describe('DateProviderInterface', () => {
  const mockDateProvider: DateProviderInterface = {
    addDays: jest.fn(),
    isDateGreaterThan: jest.fn(),
    addHours: jest.fn(),
    addMinutes: jest.fn(),
    isWithin15Minutes: jest.fn(),
    parsePtbrDateStringToDate: jest.fn(),
    isDateInInterval: jest.fn(),
  };

  it('should have addDays method', () => {
    expect(mockDateProvider.addDays).toBeDefined();
    expect(typeof mockDateProvider.addDays).toBe('function');
  });

  it('should have isDateGreaterThan method', () => {
    expect(mockDateProvider.isDateGreaterThan).toBeDefined();
    expect(typeof mockDateProvider.isDateGreaterThan).toBe('function');
  });

  it('should have addHours method', () => {
    expect(mockDateProvider.addHours).toBeDefined();
    expect(typeof mockDateProvider.addHours).toBe('function');
  });

  it('should have addMinutes method', () => {
    expect(mockDateProvider.addMinutes).toBeDefined();
    expect(typeof mockDateProvider.addMinutes).toBe('function');
  });

  it('should have isWithin15Minutes method', () => {
    expect(mockDateProvider.isWithin15Minutes).toBeDefined();
    expect(typeof mockDateProvider.isWithin15Minutes).toBe('function');
  });

  it('should have parsePtbrDateStringToDate method', () => {
    expect(mockDateProvider.parsePtbrDateStringToDate).toBeDefined();
    expect(typeof mockDateProvider.parsePtbrDateStringToDate).toBe('function');
  });

  it('should have isDateInInterval method', () => {
    expect(mockDateProvider.isDateInInterval).toBeDefined();
    expect(typeof mockDateProvider.isDateInInterval).toBe('function');
  });
});

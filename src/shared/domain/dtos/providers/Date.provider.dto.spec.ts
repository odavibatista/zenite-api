import {
  DateAddDaysDTO,
  DateAddHoursDTO,
  DateAddMinutesDTO,
  DateIsDateGreaterThanDTO,
  IsDateInIntervalDTO,
} from './Date.provider.dto';

describe('DateProvider DTOs', () => {
  it('should create DateAddDaysDTO correctly', () => {
    const dto: DateAddDaysDTO = {
      date: new Date(),
      days: 5,
    };

    expect(dto).toHaveProperty('date');
    expect(dto).toHaveProperty('days', 5);
  });

  it('should create DateAddHoursDTO correctly', () => {
    const dto: DateAddHoursDTO = {
      date: new Date(),
      hours: 3,
    };

    expect(dto).toHaveProperty('date');
    expect(dto).toHaveProperty('hours', 3);
  });

  it('should create DateAddMinutesDTO correctly', () => {
    const dto: DateAddMinutesDTO = {
      date: new Date(),
      minutes: 30,
    };

    expect(dto).toHaveProperty('date');
    expect(dto).toHaveProperty('minutes', 30);
  });

  it('should create DateIsDateGreaterThanDTO correctly', () => {
    const dto: DateIsDateGreaterThanDTO = {
      dateLeft: new Date(),
      dateRight: new Date(Date.now() - 1000),
    };

    expect(dto).toHaveProperty('dateLeft');
    expect(dto).toHaveProperty('dateRight');
  });

  it('should create IsDateInIntervalDTO correctly', () => {
    const dto: IsDateInIntervalDTO = {
      date: new Date(),
      startDate: new Date(Date.now() - 10000),
      endDate: new Date(Date.now() + 10000),
    };

    expect(dto).toHaveProperty('date');
    expect(dto).toHaveProperty('startDate');
    expect(dto).toHaveProperty('endDate');
  });
});

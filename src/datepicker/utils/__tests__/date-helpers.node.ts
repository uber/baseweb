import DateHelpers from '../date-helpers';
import dateFnsAdapter from '../date-fns-adapter';

describe('date-helpers', () => {
  const dateHelpers = new DateHelpers(dateFnsAdapter);
  let mockDate: Date;

  it('setSeconds', () => {
    const { setSeconds } = dateHelpers;

    mockDate = new Date(2028, 3, 14, 18, 33, 18, 938);
    const mockNewSeconds = 12;
    expect(setSeconds(mockDate, mockNewSeconds).toISOString()).toEqual(
      new Date(2028, 3, 14, 18, 33, mockNewSeconds, 938).toISOString()
    );
  });

  it('setMinutes', () => {
    const { setMinutes } = dateHelpers;

    mockDate = new Date(2028, 3, 14, 18, 33, 18, 938);
    const mockNewMinutes = 59;
    expect(setMinutes(mockDate, mockNewMinutes).toISOString()).toEqual(
      new Date(2028, 3, 14, 18, mockNewMinutes, 18, 938).toISOString()
    );
  });

  it('setHours', () => {
    const { setHours } = dateHelpers;

    mockDate = new Date(2028, 3, 14, 18, 33, 18, 938);
    const mockNewHours = 3;
    expect(setHours(mockDate, mockNewHours).toISOString()).toEqual(
      new Date(2028, 3, 14, mockNewHours, 33, 18, 938).toISOString()
    );
  });

  it('startOfDay', () => {
    const { startOfDay } = dateHelpers;

    mockDate = new Date(2028, 3, 14, 18, 33, 18, 938);
    expect(startOfDay(mockDate).toISOString()).toEqual(
      new Date(2028, 3, 14, 0, 0, 0, 0).toISOString()
    );
  });
});

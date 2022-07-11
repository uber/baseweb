/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import getInterpolatedString from '../i18n-interpolation';

describe('Inserts interpolations correctly', () => {
  test('i18n-interpolation', () => {
    const startDate = 'Jan 1, 2020';
    const endDate = 'Jan 15, 2020';
    const translation = 'Selected date range is from ${startDate} to ${endDate}.';
    const expectation = `Selected date range is from ${startDate} to ${endDate}.`;
    expect(getInterpolatedString(translation, { startDate, endDate })).toEqual(expectation);
  });
});

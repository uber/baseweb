/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import React from 'react';
import { render } from '@testing-library/react';
import LocaleProvider, { LocaleContext } from '../index';
import en_US from '../en_US';
import tr_TR from '../tr_TR';

describe('LocaleProvider', () => {
  const ExpectLocaleComponent = ({ expectedValue }) => {
    const locale = React.useContext(LocaleContext);
    expect(locale).toEqual(expectedValue);
    return null;
  };

  it('default returns en_US', () => {
    expect.assertions(1);
    render(
      <LocaleProvider locale={{}}>
        <ExpectLocaleComponent expectedValue={en_US} />
      </LocaleProvider>
    );
  });

  it('locale provider inherits from parent', () => {
    expect.assertions(4);
    const overrideKey = 'datepicker';
    const override = {
      [overrideKey]: { ariaLabel: 'TEST' },
      newProperty: { nestedProperty: 'a ' },
    };
    const expectedValue = {
      ...tr_TR,
      ...override,
      [overrideKey]: { ...tr_TR[overrideKey], ...override[overrideKey] },
    };

    // this test passed previously because the overwritten key only had one property
    // this made it look like the fields were merged when in fact only overwritten
    const keyLength = (x) => Object.keys(x).length;
    expect(keyLength(expectedValue[overrideKey])).toBeGreaterThan(2);
    expect(keyLength(expectedValue[overrideKey])).toBeGreaterThan(keyLength(override[overrideKey]));

    render(
      <LocaleProvider locale={tr_TR}>
        <LocaleProvider locale={override}>
          <ExpectLocaleComponent expectedValue={expectedValue} />
        </LocaleProvider>
        <ExpectLocaleComponent expectedValue={tr_TR} />
      </LocaleProvider>
    );
  });
});

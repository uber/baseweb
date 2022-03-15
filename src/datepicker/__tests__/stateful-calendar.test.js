/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import { render, getByTestId } from '@testing-library/react';

import { StatefulCalendar } from '../index.js';

describe('StatefulCalendar', () => {
  it('basic render', () => {
    const { container } = render(
      <StatefulCalendar
        initialState={{ highlightedDate: new Date() }}
        overrides={{
          CalendarContainer: { props: { 'data-testid': 'calendar-container' } },
        }}
      />
    );
    getByTestId(container, 'calendar-container');
  });
});

/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {render, getByTestId} from '@testing-library/react';

import {Calendar} from '../index.js';

describe('Component', () => {
  it('displays quick select if quickSelect is false', () => {
    const {container} = render(
      <Calendar
        overrides={{
          QuickSelectContainer: {props: {'data-testid': 'quick-select'}},
        }}
        quickSelect
      />,
    );
    getByTestId(container, 'quick-select');
  });

  it('displays quick select if range and quickSelect is false', () => {
    const {container} = render(
      <Calendar
        overrides={{
          QuickSelectContainer: {props: {'data-testid': 'quick-select'}},
        }}
        quickSelect
        range
      />,
    );
    getByTestId(container, 'quick-select');
  });
});

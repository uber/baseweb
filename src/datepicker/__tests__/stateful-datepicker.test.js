/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import { render, getByTestId } from '@testing-library/react';
import { StatefulDatepicker } from '../index.js';

describe('StatefulDatepicker', () => {
  it('basic render', () => {
    const { container } = render(
      <StatefulDatepicker
        initialState={{ value: new Date() }}
        overrides={{
          Input: { props: { overrides: { Root: { props: { 'data-testid': 'root' } } } } },
        }}
      />
    );
    getByTestId(container, 'root');
  });
});

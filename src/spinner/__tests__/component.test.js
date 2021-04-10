/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {render, getByTestId} from '@testing-library/react';

import {Spinner} from '../index.js';

describe('Spinner', () => {
  it('component overrides', () => {
    const overrides = {
      Svg: jest
        .fn()
        .mockImplementation(({children}) => (
          <svg data-testid="mock">{children}</svg>
        )),
    };
    const {container} = render(
      <Spinner $silenceV11DeprecationWarning overrides={overrides} />,
    );
    getByTestId(container, 'mock');
  });
});

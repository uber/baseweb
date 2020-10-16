/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {render, getByTestId} from '@testing-library/react';

import {Spinner} from '../index.js';

describe('Spinner', () => {
  it('color can be changed through props', () => {
    const {container} = render(
      <Spinner $silenceV11DeprecationWarning color="red" />,
    );

    const style = JSON.parse(
      container.querySelector('svg').getAttribute('test-style'),
    );
    expect(style.color).toBe('red');
  });

  it('size can be changed through props', () => {
    const {container} = render(
      <Spinner $silenceV11DeprecationWarning size="10px" />,
    );

    const style = JSON.parse(
      container.querySelector('svg').getAttribute('test-style'),
    );
    expect(style.width).toBe('10px');
    expect(style.height).toBe('10px');
  });

  it('component overrides', () => {
    const overrides = {
      Svg: jest
        .fn()
        .mockImplementation(({children}) => (
          <svg data-testid="mock">{children}</svg>
        )),
    };
    const {container} = render(
      // $FlowFixMe
      <Spinner $silenceV11DeprecationWarning overrides={overrides} />,
    );
    getByTestId(container, 'mock');
  });
});

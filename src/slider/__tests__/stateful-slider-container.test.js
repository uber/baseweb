/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {render} from '@testing-library/react';

import {StatefulContainer as StatefulSliderContainer} from '../index.js';

describe('Stateful Slider Container', function () {
  // flowlint-next-line unclear-type:off
  let allProps: any, childFn;

  beforeEach(function () {
    const stateReducer = (type, nextState) => nextState;
    childFn = jest.fn(() => null);
    allProps = {
      children: childFn,
      initialState: {value: [30, 80]},
      stateReducer: stateReducer,
      foo: 'bar',
    };
  });

  afterEach(function () {
    jest.restoreAllMocks();
  });

  it('passes additional props to child fn', function () {
    render(<StatefulSliderContainer {...allProps} />);
    expect(childFn.mock.calls[0][0]).toHaveProperty('foo', 'bar');
    expect(childFn.mock.calls[0][0]).toHaveProperty(
      'value',
      allProps.initialState.value,
    );
  });
});

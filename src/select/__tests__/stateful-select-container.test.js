/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {render} from '@testing-library/react';

import {StatefulSelectContainer} from '../index.js';
import {STATE_CHANGE_TYPE} from '../constants.js';

describe('StatefulSelectContainer', function () {
  let props = {};

  beforeEach(function () {
    props = {
      children: jest.fn(() => <div>test</div>),
      initialState: {value: [{id: 'id', label: 'label'}]},
      stateReducer: jest.fn(),
      overrides: {},
      onChange: jest.fn(),
    };
  });

  it('provides props to children render func', function () {
    //$FlowFixMe
    render(<StatefulSelectContainer {...props} />);
    const actualProps = props.children.mock.calls[0][0];
    expect(actualProps).toHaveProperty('value', props.initialState.value);
  });

  it('calls onChange handler with correct params', function () {
    //$FlowFixMe
    render(<StatefulSelectContainer {...props} />);
    const newValue = {id: 'id2', label: 'label2'};
    const params = {
      value: [...props.initialState.value, newValue],
      option: newValue,
      type: STATE_CHANGE_TYPE.select,
    };
    const actualProps = props.children.mock.calls[0][0];
    actualProps.onChange(params);
    expect(props.onChange).toHaveBeenCalledWith(params);
  });
});

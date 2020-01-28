/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {mount} from 'enzyme';
import AutosizeInput from '../autosize-input.js';
import {StyledInput, StyledInputSizer} from '../styled-components.js';

describe('AutosizeInput component', function() {
  const props = {value: 'test', onChange: () => {}, id: 'test-id'};
  const ref = React.createRef();

  test('renders correctly', function() {
    // $FlowFixMe
    const wrapper = mount(<AutosizeInput {...props} inputRef={ref} />);
    const renderedInput = wrapper.find(StyledInput).first();
    const renderedSizer = wrapper.find(StyledInputSizer).first();
    expect(renderedInput).toExist();
    expect(renderedInput.props()).toMatchObject({
      $width: '2px',
      ...props,
    });
    expect(renderedSizer).toExist();
    expect(renderedSizer.props()).toMatchObject({
      children: props.value,
    });
  });

  test('had correct initial state', function() {
    const props = {value: 'test', onChange: () => {}};
    // $FlowFixMe
    const wrapper = mount(<AutosizeInput {...props} />);
    expect(wrapper.state().inputWidth).toEqual(2);
  });
});

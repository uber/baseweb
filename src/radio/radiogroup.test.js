/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import React from 'react';
import {mount} from 'enzyme';

describe('Stateless radiogroup', function() {
  let wrapper,
    events = {};
  let allProps: any = {},
    overrides,
    isError,
    mockFn;

  beforeEach(function() {
    mockFn = jest.fn();
    isError = false;
    events = {
      onChange: mockFn,
      onMouseEnter: mockFn,
      onMouseLeave: mockFn,
      onFocus: mockFn,
      onBlur: mockFn,
    };
    allProps = {
      ...events,
      labelPlacement: 'left',
      isError: isError,
      autoFocus: false,
      disabled: false,
      checked: false,
    };
  });

  afterEach(function() {
    jest.restoreAllMocks();
    wrapper && wrapper.unmount();
  });

  test('should check only radio button, which equals to selected value', function() {
    jest.mock('./radio', () => jest.fn(() => <div>test</div>));
    const {
      StyledRoot,
      StyledLabel,
      StyledRadioMark,
      StyledInput,
      RadioGroup,
      StyledRadio,
    } = require('./index');
    allProps.value = '2';
    allProps.overrides = overrides;
    overrides = {
      Root: StyledRoot,
      RadioMark: StyledRadioMark,
      Label: StyledLabel,
      Input: StyledInput,
    };
    wrapper = mount(
      <RadioGroup {...allProps}>
        <StyledRadio value="1">First</StyledRadio>
        <StyledRadio value="2">Second</StyledRadio>
        <StyledRadio value="3">Third</StyledRadio>
      </RadioGroup>,
    );
    const radio: any = require('./radio');
    expect(radio.mock.calls[0][0].checked).toBeFalsy();
    expect(radio.mock.calls[1][0].checked).toBeTruthy();
    expect(radio.mock.calls[2][0].checked).toBeFalsy();
  });
});

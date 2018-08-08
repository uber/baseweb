/*
MIT License

Copyright (c) 2018 Uber Technologies, Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
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

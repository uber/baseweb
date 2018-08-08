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

describe('Stateful checkbox', function() {
  let allProps: any, wrapper;

  beforeEach(function() {
    allProps = {};
    jest.mock('../checkbox', () => jest.fn(() => <div>test</div>));
  });

  afterEach(function() {
    jest.restoreAllMocks();
    wrapper && wrapper.unmount();
  });

  test('should provide default styled components to render', function() {
    const {
      StyledRoot,
      StyledLabel,
      StyledCheckmark,
      StyledInput,
      StatefulCheckbox,
    } = require('../index');
    allProps.overrides = {
      Root: StyledRoot,
      Label: StyledLabel,
      Checkmark: StyledCheckmark,
      Input: StyledInput,
    };
    const checkbox: any = require('../checkbox');
    wrapper = mount(<StatefulCheckbox {...allProps} />);
    const {overrides} = checkbox.mock.calls[0][0];
    expect(overrides).toEqual({
      Root: StyledRoot,
      Checkmark: StyledCheckmark,
      Label: StyledLabel,
      Input: StyledInput,
    });
  });

  test('should pass all the other props to stateless checkbox', function() {
    const otherProps = {
      someProp: 'some other props',
      autoFocus: false,
    };
    allProps = {...allProps, ...otherProps};
    const {StatefulCheckbox} = require('../index');
    const checkbox: any = require('../checkbox');
    wrapper = mount(<StatefulCheckbox {...allProps} />);
    // eslint-disable-next-line no-unused-vars
    const {overrides, ...rest} = checkbox.mock.calls[1][0];
    expect(rest).toMatchObject({
      someProp: 'some other props',
      checked: false,
      autoFocus: false,
      isIndeterminate: false,
    });
  });
});

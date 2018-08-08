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

describe('Stateful radiogroup', function() {
  let allProps: any, wrapper;

  beforeEach(function() {
    allProps = {};
  });

  afterEach(function() {
    jest.restoreAllMocks();
    wrapper && wrapper.unmount();
  });

  test('should provide overrides components to render', function() {
    jest.mock('../radio', () => jest.fn(() => <div>test</div>));
    const {
      StyledRoot,
      StyledLabel,
      StyledRadioMark,
      StyledInput,
      StyledRadio,
      StatefulRadioGroup,
    } = require('../index');
    allProps.overrides = {
      Root: StyledRoot,
      Label: StyledLabel,
      RadioMark: StyledRadioMark,
      Input: StyledInput,
    };
    const radio: any = require('../radio');
    wrapper = mount(
      <StatefulRadioGroup {...allProps}>
        <StyledRadio value="1">First</StyledRadio>
        <StyledRadio value="2">Second</StyledRadio>
        <StyledRadio value="3">Third</StyledRadio>
      </StatefulRadioGroup>,
    );
    const {overrides} = radio.mock.calls[0][0];
    expect(overrides).toEqual({
      Root: StyledRoot,
      Checkmark: StyledRadioMark,
      Label: StyledLabel,
      Input: StyledInput,
    });
  });
});

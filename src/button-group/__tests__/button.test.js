/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import {shallow} from 'enzyme';

import {Button} from '../index.js';

// Button component here is simply a wrapper for the generic button.
// only testing the functionality particular to the wrapper.
describe('Button', () => {
  it('provides style props to styled component', () => {
    const wrapper = shallow(<Button first last selected />);

    expect(wrapper.props().$first).toBe(true);
    expect(wrapper.props().$last).toBe(true);
    expect(wrapper.props().$selected).toBe(true);
  });
});

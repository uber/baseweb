/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import {mount} from 'enzyme';
import {
  Unstable_Calendar as Calendar,
  StyledRoot,
  StyledMonth,
  StyledWeek,
  StyledDay,
} from '../index.js';

describe('Component', () => {
  test('basic render', () => {
    const onSelect = jest.fn();
    const wrapper = mount(<Calendar onSelect={onSelect} />);

    expect(wrapper.find(StyledRoot).first()).toExist();
    expect(wrapper.find(StyledMonth).first()).toExist();
    expect(wrapper.find(StyledWeek).first()).toExist();
    expect(wrapper.find(StyledDay).first()).toExist();
  });
});

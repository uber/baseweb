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
  StyledQuickSelectContainer,
  StyledMonth,
  StyledWeek,
  StyledDay,
} from '../index.js';

describe('Component', () => {
  test('basic render', () => {
    const onChange = jest.fn();
    const wrapper = mount(<Calendar onChange={onChange} />);

    expect(wrapper.find(StyledRoot).first()).toExist();
    expect(wrapper.find(StyledMonth).first()).toExist();
    expect(wrapper.find(StyledWeek).first()).toExist();
    expect(wrapper.find(StyledDay).first()).toExist();
  });

  test('should not display quick select if isRange is false', () => {
    const wrapper = mount(<Calendar enableQuickSelect />);
    expect(wrapper.find(StyledQuickSelectContainer).first()).not.toExist();
  });

  test('should display quick select if isRange and enableQuickSelect is true', () => {
    const wrapper = mount(<Calendar isRange enableQuickSelect />);
    expect(wrapper.find(StyledQuickSelectContainer).first()).toExist();
  });
});

/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {mount} from 'enzyme';
import {
  Calendar,
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

  test('should not display quick select if range is false', () => {
    const wrapper = mount(<Calendar quickSelect />);
    expect(wrapper.find(StyledQuickSelectContainer).first()).not.toExist();
  });

  test('should display quick select if range and quickSelect is true', () => {
    const wrapper = mount(<Calendar range quickSelect />);
    expect(wrapper.find(StyledQuickSelectContainer).first()).toExist();
  });
});

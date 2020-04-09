/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {mount} from 'enzyme';
import {
  Calendar,
  StyledRoot,
  StyledSelectorContainer,
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

  // Changed the logic here so that developers can pass through custom
  // single date quick selects.
  test('should display quick select if range is false', () => {
    const wrapper = mount(<Calendar quickSelect />);
    expect(wrapper.find(StyledSelectorContainer).first()).toExist();
  });

  test('should display quick select if range and quickSelect is true', () => {
    const wrapper = mount(<Calendar range quickSelect />);
    expect(wrapper.find(StyledSelectorContainer).first()).toExist();
  });
});

describe('Highlight resets on value change', () => {
  describe('starting value is 2020-03-16 to 2020-03-20, 2020-03-16 is highlighted', () => {
    test('changing value to 2020-03-23 to 2020-03-27, 2020-3-23 is highlighted', () => {
      const wrapper = mount(
        <Calendar
          quickSelect
          range
          value={[
            new Date('2020-03-16T00:00:00'),
            new Date('2020-03-20T23:59:59'),
          ]}
          highlightedDate={new Date('2020-03-16T00:00:00')}
        />,
      );
      const prevProps = wrapper.props();

      wrapper.setProps({
        value: [
          new Date('2020-03-23T00:00:01'),
          new Date('2020-03-27T23:59:59'),
        ],
      });

      wrapper.instance().componentDidUpdate(prevProps);

      expect(wrapper.state().highlightedDate).toEqual(
        new Date('2020-03-23T00:00:01'),
      );
    });
  });
});

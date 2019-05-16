/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import {mount} from 'enzyme';

import TriangleDown from '../../icon/triangle-down.js';
import TriangleUp from '../../icon/triangle-up.js';
import {SortableHeadCell} from '../index.js';

describe('sortable-head-cell', () => {
  it('displays triangle down when direction is ASC', () => {
    const wrapper = mount(<SortableHeadCell direction="ASC" title="test" />);
    const down = wrapper.find(TriangleDown);
    expect(down).toHaveLength(1);
  });

  it('displays triangle up when direction is DESC', () => {
    const wrapper = mount(<SortableHeadCell direction="DESC" title="test" />);
    const up = wrapper.find(TriangleUp);
    expect(up).toHaveLength(1);
  });

  it('calls provided onSort fn on click', () => {
    const spy = jest.fn();
    const wrapper = mount(
      <SortableHeadCell onSort={spy} direction={null} title="test" />,
    );
    const button = wrapper.find('button');
    button.simulate('click');
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('does not call provided onSort fn on click if disabled', () => {
    const spy = jest.fn();
    const wrapper = mount(
      <SortableHeadCell onSort={spy} direction={null} title="test" disabled />,
    );
    const button = wrapper.find('button');
    button.simulate('click');
    expect(spy).toHaveBeenCalledTimes(0);
  });
});

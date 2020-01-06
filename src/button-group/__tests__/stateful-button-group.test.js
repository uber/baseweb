/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {mount} from 'enzyme';

import {Button} from '../../button/index.js';

import {StatefulButtonGroup, MODE} from '../index.js';

function buildSimpleWrapper(props = {}) {
  return mount(
    <StatefulButtonGroup {...props}>
      <Button />
      <Button />
      <Button />
    </StatefulButtonGroup>,
  );
}

function clickChildAtIndex(wrapper, index) {
  const childAtIndex = wrapper.find('div').childAt(index);
  childAtIndex.simulate('click');
}

function expectSelectedValueAtIndex(wrapper, index, value) {
  const childAtIndex = wrapper.find('div').childAt(index);
  expect(childAtIndex).toHaveProp('isSelected', value);
}

describe('StatefulButtonGroup', () => {
  it('renders with default props', () => {
    const wrapper = buildSimpleWrapper();
    expect(wrapper).toExist();
    expect(wrapper.find('div').first()).toExist();
  });

  describe('default mode', () => {
    it('does not update state when clicked', () => {
      const wrapper = buildSimpleWrapper();
      const index = 0;
      clickChildAtIndex(wrapper, index);
      expectSelectedValueAtIndex(wrapper, index, false);
    });
  });

  describe('radio mode', () => {
    it('sets button selected when initially clicked', () => {
      const wrapper = buildSimpleWrapper({mode: MODE.radio});
      const index = 0;
      clickChildAtIndex(wrapper, index);
      expectSelectedValueAtIndex(wrapper, index, true);
    });

    it('sets button unselected on second click', () => {
      const wrapper = buildSimpleWrapper({mode: MODE.radio});
      const index = 1;
      clickChildAtIndex(wrapper, index);
      expectSelectedValueAtIndex(wrapper, index, true);
      clickChildAtIndex(wrapper, index);
      expectSelectedValueAtIndex(wrapper, index, false);
    });

    it('sets button unselected when another child is clicked', () => {
      const wrapper = buildSimpleWrapper({mode: MODE.radio});
      const first = 0;
      const last = 2;
      clickChildAtIndex(wrapper, first);
      expectSelectedValueAtIndex(wrapper, first, true);
      clickChildAtIndex(wrapper, last);
      expectSelectedValueAtIndex(wrapper, first, false);
      expectSelectedValueAtIndex(wrapper, last, true);
    });

    it('sets initial selected', () => {
      const wrapper = buildSimpleWrapper({
        mode: MODE.radio,
        initialState: {selected: 0},
      });
      expectSelectedValueAtIndex(wrapper, 0, true);
      expectSelectedValueAtIndex(wrapper, 1, false);
      expectSelectedValueAtIndex(wrapper, 2, false);
    });

    it('handles provided state reducer', () => {
      const wrapper = buildSimpleWrapper({
        mode: MODE.radio,
        // always sets the first child selected
        stateReducer: () => ({selected: [0]}),
      });

      expectSelectedValueAtIndex(wrapper, 0, false);
      clickChildAtIndex(wrapper, 2);
      expectSelectedValueAtIndex(wrapper, 0, true);
    });
  });

  describe('checkbox mode', () => {
    it('sets button selected when initially clicked', () => {
      const wrapper = buildSimpleWrapper({mode: MODE.checkbox});
      const index = 0;
      clickChildAtIndex(wrapper, index);
      expectSelectedValueAtIndex(wrapper, index, true);
    });

    it('sets button unselected on second click', () => {
      const wrapper = buildSimpleWrapper({mode: MODE.checkbox});
      const index = 1;
      clickChildAtIndex(wrapper, index);
      expectSelectedValueAtIndex(wrapper, index, true);
      clickChildAtIndex(wrapper, index);
      expectSelectedValueAtIndex(wrapper, index, false);
    });

    it('maintains selection when another child is clicked', () => {
      const wrapper = buildSimpleWrapper({mode: MODE.checkbox});
      const first = 0;
      const last = 2;
      clickChildAtIndex(wrapper, first);
      expectSelectedValueAtIndex(wrapper, first, true);
      clickChildAtIndex(wrapper, last);
      expectSelectedValueAtIndex(wrapper, first, true);
      expectSelectedValueAtIndex(wrapper, last, true);
    });

    it('sets initial selected', () => {
      const wrapper = buildSimpleWrapper({
        mode: MODE.checkbox,
        initialState: {selected: [0, 1]},
      });
      expectSelectedValueAtIndex(wrapper, 0, true);
      expectSelectedValueAtIndex(wrapper, 1, true);
      expectSelectedValueAtIndex(wrapper, 2, false);
    });

    it('handles provided state reducer', () => {
      const wrapper = buildSimpleWrapper({
        mode: MODE.checkbox,
        // always sets the first child selected
        stateReducer: () => ({selected: [0]}),
      });

      expectSelectedValueAtIndex(wrapper, 0, false);
      clickChildAtIndex(wrapper, 2);
      expectSelectedValueAtIndex(wrapper, 0, true);
    });
  });
});

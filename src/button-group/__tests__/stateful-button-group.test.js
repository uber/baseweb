/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {render, fireEvent} from '@testing-library/react';

import {Button} from '../../button/index.js';

import {StatefulButtonGroup, MODE} from '../index.js';

function buildSimpleWrapper(props = {}) {
  return render(
    <StatefulButtonGroup {...props}>
      <Button>one</Button>
      <Button>two</Button>
      <Button>three</Button>
    </StatefulButtonGroup>,
  );
}

function childAtIndex(container, index) {
  const buttons = container.querySelectorAll('button');
  return buttons[index];
}

function clickChildAtIndex(container, index) {
  fireEvent.click(childAtIndex(container, index));
}

function expectSelectedValueAtIndex(container, index, value) {
  expect(childAtIndex(container, index).getAttribute('aria-checked')).toBe(
    value,
  );
}

describe('StatefulButtonGroup', () => {
  it('renders with default props', () => {
    const {container} = buildSimpleWrapper();
    expect(container.querySelector('div')).not.toBeNull();
  });

  describe('default mode', () => {
    it('does not update state when clicked', () => {
      const {container} = buildSimpleWrapper();
      const index = 0;
      clickChildAtIndex(container, index);
      expectSelectedValueAtIndex(container, index, 'false');
    });
  });

  describe('radio mode', () => {
    it('sets button selected when initially clicked', () => {
      const {container} = buildSimpleWrapper({mode: MODE.radio});
      const index = 0;
      clickChildAtIndex(container, index);
      expectSelectedValueAtIndex(container, index, 'true');
    });

    it('sets button unselected on second click', () => {
      const {container} = buildSimpleWrapper({mode: MODE.radio});
      const index = 1;
      clickChildAtIndex(container, index);
      expectSelectedValueAtIndex(container, index, 'true');
      clickChildAtIndex(container, index);
      expectSelectedValueAtIndex(container, index, 'false');
    });

    it('sets button unselected when another child is clicked', () => {
      const {container} = buildSimpleWrapper({mode: MODE.radio});
      const first = 0;
      const last = 2;
      clickChildAtIndex(container, first);
      expectSelectedValueAtIndex(container, first, 'true');
      clickChildAtIndex(container, last);
      expectSelectedValueAtIndex(container, first, 'false');
      expectSelectedValueAtIndex(container, last, 'true');
    });

    it('sets initial selected', () => {
      const {container} = buildSimpleWrapper({
        mode: MODE.radio,
        initialState: {selected: 0},
      });
      expectSelectedValueAtIndex(container, 0, 'true');
      expectSelectedValueAtIndex(container, 1, 'false');
      expectSelectedValueAtIndex(container, 2, 'false');
    });

    it('handles provided state reducer', () => {
      const {container} = buildSimpleWrapper({
        mode: MODE.radio,
        // always sets the first child selected
        stateReducer: () => ({selected: [0]}),
      });

      expectSelectedValueAtIndex(container, 0, 'false');
      clickChildAtIndex(container, 2);
      expectSelectedValueAtIndex(container, 0, 'true');
    });
  });

  describe('checkbox mode', () => {
    it('sets button selected when initially clicked', () => {
      const {container} = buildSimpleWrapper({mode: MODE.checkbox});
      const index = 0;
      clickChildAtIndex(container, index);
      expectSelectedValueAtIndex(container, index, 'true');
    });

    it('sets button unselected on second click', () => {
      const {container} = buildSimpleWrapper({mode: MODE.checkbox});
      const index = 1;
      clickChildAtIndex(container, index);
      expectSelectedValueAtIndex(container, index, 'true');
      clickChildAtIndex(container, index);
      expectSelectedValueAtIndex(container, index, 'false');
    });

    it('maintains selection when another child is clicked', () => {
      const {container} = buildSimpleWrapper({mode: MODE.checkbox});
      const first = 0;
      const last = 2;
      clickChildAtIndex(container, first);
      expectSelectedValueAtIndex(container, first, 'true');
      clickChildAtIndex(container, last);
      expectSelectedValueAtIndex(container, first, 'true');
      expectSelectedValueAtIndex(container, last, 'true');
    });

    it('sets initial selected', () => {
      const {container} = buildSimpleWrapper({
        mode: MODE.checkbox,
        initialState: {selected: [0, 1]},
      });
      expectSelectedValueAtIndex(container, 0, 'true');
      expectSelectedValueAtIndex(container, 1, 'true');
      expectSelectedValueAtIndex(container, 2, 'false');
    });

    it('handles provided state reducer', () => {
      const {container} = buildSimpleWrapper({
        mode: MODE.checkbox,
        // always sets the first child selected
        stateReducer: () => ({selected: [0]}),
      });

      expectSelectedValueAtIndex(container, 0, 'false');
      clickChildAtIndex(container, 2);
      expectSelectedValueAtIndex(container, 0, 'true');
    });
  });
});

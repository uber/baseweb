/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {mount} from 'enzyme';
import StatefulMenu from '../stateful-menu.js';
import StatefulContainer from '../stateful-container.js';
import Menu from '../menu.js';

describe('Menu StatefulMenu', () => {
  test('renders with props', () => {
    const props = {
      items: [{label: 'item1'}, {label: 'item2'}],
      getItemLabel: item => item.label,
    };
    const component = mount(<StatefulMenu {...props} />);
    expect(component.find(StatefulContainer).length).toBe(1);
    expect(component.find(Menu).length).toBe(1);
  });
});

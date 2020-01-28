/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {mount} from 'enzyme';
import {List, StyledItem} from '../index.js';

describe('List', () => {
  //$FlowFixMe
  console.warn = jest.fn(); // eslint-disable-line
  test('basic render', () => {
    const wrapper = mount(
      <List items={['Item 1', 'Item 2']} onChange={jest.fn()} />,
    );
    expect(wrapper.find(StyledItem)).toHaveLength(2);
  });

  test('label override', () => {
    const CustomLabel = ({children}) => <span>Child: {children}</span>;
    const overrides = {
      Label: CustomLabel,
    };
    const wrapper = mount(
      <List
        items={['Item 1', 'Item 2']}
        onChange={jest.fn()}
        overrides={overrides}
      />,
    );
    expect(
      wrapper
        .find(overrides.Label)
        .at(0)
        .text(),
    ).toBe('Child: Item 1');
    expect(
      wrapper
        .find(overrides.Label)
        .at(1)
        .text(),
    ).toBe('Child: Item 2');
  });
});

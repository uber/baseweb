/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {mount} from 'enzyme';

import FlexGrid, {BaseFlexGrid} from '../flex-grid.js';
import {camelToKebab} from '../../helpers/strings.js';

describe('BaseFlexGrid', () => {
  it('renders', () => {
    const wrapper = mount(<BaseFlexGrid />);
    expect(wrapper).toMatchSnapshot('with default styles');

    wrapper.setProps({
      display: 'none',
      flexWrap: false,
      overrides: {Block: {style: {color: 'red'}}},
    });
    expect(wrapper).toMatchSnapshot('with overridden styles');
  });
});

describe('FlexGrid', () => {
  it('renders', () => {
    const wrapper = mount(<FlexGrid />);
    expect(wrapper).toMatchSnapshot('with default styles');

    wrapper.setProps({overrides: {Block: {style: {color: 'red'}}}});
    expect(wrapper).toMatchSnapshot('with overridden styles');
  });

  it('passes FlexGrid props to children', () => {
    const MockFlexGridItem = props => (
      <div
        {...Object.keys(props).reduce((acc, key) => {
          // Convert to kebab to avoid React warnings
          acc[camelToKebab(key)] = props[key];
          return acc;
        }, {})}
      />
    );
    const wrapper = mount(
      <FlexGrid flexGridColumnCount={4}>
        <MockFlexGridItem>Item 1</MockFlexGridItem>
        <MockFlexGridItem>Item 2</MockFlexGridItem>
      </FlexGrid>,
    );
    expect(wrapper).toMatchSnapshot('FlexGridItem with flexGridColumnCount');
  });
});

/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {mount} from 'enzyme';

import FlexGridItem, {
  flexGridItemMediaQueryStyle,
  flexGridItemStyle,
  getResponsiveValue,
} from '../flex-grid-item.js';
import {LightTheme} from '../../themes/index.js';

describe('FlexGridItem', () => {
  test('flexGridItemMediaQueryStyle', () => {
    const testProps = [
      {flexGridColumnCount: 1, flexGridColumnGap: 0, flexGridRowGap: 0},
      {flexGridColumnCount: 1, flexGridColumnGap: '1px', flexGridRowGap: '2px'},
      {flexGridColumnCount: 2, flexGridColumnGap: '1px', flexGridRowGap: '2px'},
      {flexGridColumnCount: 3, flexGridColumnGap: '1px', flexGridRowGap: '2px'},
    ];
    testProps.forEach(props => {
      expect(
        flexGridItemMediaQueryStyle({...props, $theme: LightTheme}),
      ).toMatchSnapshot(JSON.stringify(props));
    });
  });

  test('getResponsiveValue', () => {
    const testCases = [
      {testCase: [null, 0], expected: null},
      {testCase: [null, 1], expected: null},
      {testCase: ['10px', 0], expected: '10px'},
      {testCase: ['10px', 1], expected: '10px'},
      {testCase: [['10px', '20px'], 0], expected: '10px'},
      {testCase: [['10px', '20px'], 1], expected: '20px'},
      {testCase: [['10px', '20px'], 2], expected: '20px'},
    ];
    testCases.forEach(({testCase, expected}) => {
      expect(getResponsiveValue(...testCase)).toEqual(expected);
    });
  });

  test('flexGridItemStyle', () => {
    const snapshotProps = [
      {},
      {
        $flexGridColumnCount: 2,
        $flexGridColumnGap: '1px',
        $flexGridRowGap: '2px',
      },
      {
        $flexGridColumnCount: [1, 2],
        $flexGridColumnGap: '1px',
        $flexGridRowGap: '2px',
      },
      {
        $flexGridColumnCount: [1, 2],
        $flexGridColumnGap: ['1px', '2px'],
        $flexGridRowGap: ['2px', '4px'],
      },
    ];
    snapshotProps.forEach(props => {
      expect(flexGridItemStyle({...props, $theme: LightTheme})).toMatchSnapshot(
        JSON.stringify(props),
      );
    });
  });

  it('renders', () => {
    const wrapper = mount(<FlexGridItem />);
    expect(wrapper).toMatchSnapshot('with default styles');

    wrapper.setProps({overrides: {Block: {style: {color: 'red'}}}});
    expect(wrapper).toMatchSnapshot('with overridden styles');
  });
});

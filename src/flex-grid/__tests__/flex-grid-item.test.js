/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {render} from '@testing-library/react';

import FlexGridItem, {
  flexGridItemMediaQueryStyle,
  flexGridItemStyle,
  getResponsiveValue,
} from '../flex-grid-item.js';
import {LightTheme} from '../../themes/index.js';

describe('FlexGridItem', () => {
  test('flexGridItemMediaQueryStyle', () => {
    const testProps = [
      {
        flexGridColumnCount: 2,
        flexGridColumnGap: 0,
        flexGridRowGap: 0,
        flexGridItemIndex: 0,
        flexGridItemCount: 4,
        snapshotName: '2 columns no gaps',
      },
      {
        flexGridColumnCount: 2,
        flexGridColumnGap: '1px',
        flexGridRowGap: '2px',
        flexGridItemIndex: 0,
        flexGridItemCount: 4,
        snapshotName: '2 columns with gaps',
      },
      {
        flexGridColumnCount: 2,
        flexGridColumnGap: '1px',
        flexGridRowGap: '2px',
        flexGridItemIndex: 1,
        flexGridItemCount: 4,
        snapshotName: '2 columns with gaps end of row',
      },
      {
        flexGridColumnCount: 2,
        flexGridColumnGap: '1px',
        flexGridRowGap: '2px',
        flexGridItemIndex: 2,
        flexGridItemCount: 4,
        snapshotName: '2 columns with gaps end of column',
      },
      {
        flexGridColumnCount: 2,
        flexGridColumnGap: '1px',
        flexGridRowGap: '2px',
        flexGridItemIndex: 3,
        flexGridItemCount: 4,
        snapshotName: '2 columns with gaps end of row and column',
      },
      {
        flexGridColumnCount: 2,
        flexGridColumnGap: '1px',
        flexGridRowGap: '2px',
        flexGridItemIndex: 2,
        flexGridItemCount: 3,
        snapshotName: '2 columns with gaps row ends early',
      },
    ];
    testProps.forEach(
      ({
        flexGridColumnCount,
        flexGridColumnGap,
        flexGridRowGap,
        flexGridItemIndex,
        flexGridItemCount,
        snapshotName,
      }) => {
        expect(
          flexGridItemMediaQueryStyle({
            flexGridColumnCount,
            flexGridColumnGap,
            flexGridRowGap,
            flexGridItemIndex,
            flexGridItemCount,
            $theme: LightTheme,
          }),
        ).toMatchSnapshot(snapshotName);
      },
    );
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
      // $FlowFixMe - intentionally missing props
      {
        snapshotName: 'no props',
      },
      {
        $flexGridColumnCount: 2,
        $flexGridColumnGap: '1px',
        $flexGridRowGap: '2px',
        $flexGridItemIndex: 0,
        $flexGridItemCount: 6,
        snapshotName: 'non-responsive',
      },
      {
        $flexGridColumnCount: [2, 3],
        $flexGridColumnGap: '1px',
        $flexGridRowGap: '2px',
        $flexGridItemIndex: 0,
        $flexGridItemCount: 6,
        snapshotName: 'responsive columns',
      },
      {
        $flexGridColumnCount: [2, 3],
        $flexGridColumnGap: ['1px', '2px'],
        $flexGridRowGap: ['2px', '4px'],
        $flexGridItemIndex: 0,
        $flexGridItemCount: 6,
        snapshotName: 'responsive columns and gaps',
      },
    ];
    snapshotProps.forEach(
      ({
        $flexGridColumnCount,
        $flexGridColumnGap,
        $flexGridRowGap,
        $flexGridItemIndex,
        $flexGridItemCount,
        snapshotName,
      }) => {
        expect(
          flexGridItemStyle({
            $flexGridColumnCount,
            $flexGridColumnGap,
            $flexGridRowGap,
            $flexGridItemIndex,
            $flexGridItemCount,
            $theme: LightTheme,
          }),
        ).toMatchSnapshot(snapshotName);
      },
    );
  });

  it('renders with expected styles', () => {
    const {container} = render(<FlexGridItem />);
    const style = JSON.parse(
      container.querySelector('div').getAttribute('test-style'),
    );
    expect(style).toMatchInlineSnapshot(`
Object {
  "flexGrow": 1,
  "marginBottom": 0,
  "marginRight": 0,
  "width": "calc((100% - 0px) / 1 - .5px)",
}
`);
  });

  it('renders with expected style overrides', () => {
    const {container} = render(
      <FlexGridItem overrides={{Block: {style: {color: 'red'}}}} />,
    );
    const style = JSON.parse(
      container.querySelector('div').getAttribute('test-style'),
    );
    expect(style).toMatchInlineSnapshot(`
Object {
  "color": "red",
  "flexGrow": 1,
  "marginBottom": 0,
  "marginRight": 0,
  "width": "calc((100% - 0px) / 1 - .5px)",
}
`);
  });
});

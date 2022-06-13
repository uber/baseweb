/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
// $FlowFixMe
import { render, prettyDOM } from '@testing-library/react';

import FlexGrid from '../flex-grid.js';
import { camelToKebab } from '../../helpers/strings.js';

describe('FlexGrid', () => {
  it('passes FlexGrid props to children', () => {
    const MockFlexGridItem = (props) => (
      <div
        {...Object.keys(props).reduce((acc, key) => {
          // Convert to kebab to avoid React warnings
          acc[camelToKebab(key)] = props[key];
          return acc;
        }, {})}
      />
    );
    const { baseElement } = render(
      <FlexGrid flexGridColumnCount={4}>
        <MockFlexGridItem>Item 1</MockFlexGridItem>
        <MockFlexGridItem>Item 2</MockFlexGridItem>
      </FlexGrid>
    );
    expect(prettyDOM(baseElement)).toMatchInlineSnapshot(`
      "[36m<body>[39m
        [36m<div>[39m
          [36m<div[39m
            [33mdata-baseweb[39m=[32m\\"flex-grid\\"[39m
            [33mstyled-component[39m=[32m\\"true\\"[39m
            [33mtest-style[39m=[32m\\"{
        \\\\\\"display\\\\\\": \\\\\\"flex\\\\\\",
        \\\\\\"flexWrap\\\\\\": \\\\\\"wrap\\\\\\"
      }\\"[39m
          [36m>[39m
            [36m<div[39m
              [33mflex-grid-column-count[39m=[32m\\"4\\"[39m
              [33mflex-grid-item-count[39m=[32m\\"2\\"[39m
              [33mflex-grid-item-index[39m=[32m\\"0\\"[39m
            [36m>[39m
              [0mItem 1[0m
            [36m</div>[39m
            [36m<div[39m
              [33mflex-grid-column-count[39m=[32m\\"4\\"[39m
              [33mflex-grid-item-count[39m=[32m\\"2\\"[39m
              [33mflex-grid-item-index[39m=[32m\\"1\\"[39m
            [36m>[39m
              [0mItem 2[0m
            [36m</div>[39m
          [36m</div>[39m
        [36m</div>[39m
      [36m</body>[39m"
    `);
  });
});

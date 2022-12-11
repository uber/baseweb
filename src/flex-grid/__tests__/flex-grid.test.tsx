/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { render, prettyDOM } from '@testing-library/react';

import FlexGrid from '../flex-grid';
import { camelToKebab } from '../../helpers/strings';

describe('FlexGrid', () => {
  it('passes FlexGrid props to children', () => {
    // @ts-ignore
    const MockFlexGridItem = (props) => (
      <div
        {...Object.keys(props).reduce((acc, key) => {
          // Convert to kebab to avoid React warnings
          // @ts-ignore
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
    // eslint-disable-next-line jest/no-restricted-matchers
    expect(prettyDOM(baseElement)).toMatchSnapshot('FlexGridItem with flexGridColumnCount');
  });
});

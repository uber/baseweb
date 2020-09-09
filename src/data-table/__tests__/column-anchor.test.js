/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import {render} from '@testing-library/react';

import {AnchorColumn} from '../index.js';

describe('anchor column', () => {
  it('is sortable by default', () => {
    const column = AnchorColumn({
      title: 'column',
      mapDataToValue: () => ({
        content: 'hello',
        href: 'https://baseweb.design',
      }),
    });
    expect(column.sortable).toBe(true);
  });

  it('is not filterable by default', () => {
    const column = AnchorColumn({
      title: 'column',
      mapDataToValue: () => ({
        content: 'hello',
        href: 'https://baseweb.design',
      }),
    });
    expect(column.filterable).toBe(false);
  });

  it('applies provided sortable value', () => {
    const column = AnchorColumn({
      title: 'column',
      sortable: false,
      mapDataToValue: () => ({
        content: 'hello',
        href: 'https://baseweb.design',
      }),
    });
    expect(column.sortable).toBe(false);
  });

  it('cell renders provided value', () => {
    const column = AnchorColumn({
      title: 'column',
      mapDataToValue: data => ({
        content: data.content,
        href: data.href,
      }),
    });
    const Cell = column.renderCell;

    const {container} = render(
      <Cell value={{content: 'baseweb', href: 'https://baseweb.design'}} />,
    );
    const cell = container.querySelector('a');
    expect(cell.textContent).toBe('baseweb');
  });

  it('cell renders provided elementAs', () => {
    const column = AnchorColumn({
      title: 'column',
      elementAs: 'div',
      mapDataToValue: data => ({
        content: data.content,
        href: data.href,
      }),
    });
    const Cell = column.renderCell;

    const {container} = render(
      <Cell value={{content: 'baseweb', href: 'https://baseweb.design'}} />,
    );
    const cell = container.querySelector('div');
    expect(cell.textContent).toBe('baseweb');
  });

  it('builds expected sort function', () => {
    const column = AnchorColumn({
      title: 'column',
      mapDataToValue: data => ({
        content: data.content,
        href: data.href,
      }),
    });

    function makeValue(item) {
      return {
        content: item,
        href: 'https://baseweb.design',
      };
    }

    const input = ['A', 'B', 'C', 'C', 'B', 'A'].map(makeValue);
    input.sort(column.sortFn);

    const output = ['A', 'A', 'B', 'B', 'C', 'C'].map(makeValue);
    for (let i = 0; i < input.length; i++) {
      expect(input[i].content).toBe(output[i].content);
    }
  });
});

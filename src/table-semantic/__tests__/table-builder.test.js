/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {shallow} from 'enzyme';

import {
  Unstable_TableBuilder,
  Unstable_TableBuilderColumn,
  StyledTableBodyRow,
  StyledTableBodyCell,
} from '../index.js';

const DATA = [
  {
    foo: 10,
    bar: 'banana',
    url: 'https://example.com/b',
  },
  {
    foo: 1,
    bar: 'carrot',
    url: 'https://example.com/c',
  },
  {
    foo: 2,
    bar: 'apple',
    url: 'https://example.com/a',
  },
];

describe('Table Semantic Builder', () => {
  it('renders expected number of rows', () => {
    const wrapper = shallow(
      <Unstable_TableBuilder data={DATA}>
        <Unstable_TableBuilderColumn header="Foo">
          {row => row.foo}
        </Unstable_TableBuilderColumn>
        <Unstable_TableBuilderColumn header="Bar">
          {row => <a href={row.url}>{row.bar}</a>}
        </Unstable_TableBuilderColumn>
        <Unstable_TableBuilderColumn>
          {row => 'Hey'}
        </Unstable_TableBuilderColumn>
      </Unstable_TableBuilder>,
    );

    expect(wrapper.find(StyledTableBodyRow)).toHaveLength(DATA.length);
  });

  it('renders expected number of columns', () => {
    const wrapper = shallow(
      <Unstable_TableBuilder data={DATA}>
        <Unstable_TableBuilderColumn header="Foo">
          {row => row.foo}
        </Unstable_TableBuilderColumn>
        <Unstable_TableBuilderColumn header="Bar">
          {row => <a href={row.url}>{row.bar}</a>}
        </Unstable_TableBuilderColumn>
        <Unstable_TableBuilderColumn>
          {row => 'Hey'}
        </Unstable_TableBuilderColumn>
      </Unstable_TableBuilder>,
    );

    const cells = wrapper
      .find(StyledTableBodyRow)
      .first()
      .find(StyledTableBodyCell);

    expect(cells).toHaveLength(3);
  });

  it('renders expected number of anchors', () => {
    const wrapper = shallow(
      <Unstable_TableBuilder data={DATA}>
        <Unstable_TableBuilderColumn header="Foo">
          {row => row.foo}
        </Unstable_TableBuilderColumn>
        <Unstable_TableBuilderColumn header="Bar">
          {row => <a href={row.url}>{row.bar}</a>}
        </Unstable_TableBuilderColumn>
        <Unstable_TableBuilderColumn>
          {row => 'Hey'}
        </Unstable_TableBuilderColumn>
      </Unstable_TableBuilder>,
    );

    const anchors = wrapper.find('a');

    expect(anchors).toHaveLength(DATA.length);
    expect(anchors.first().prop('href')).toBe('https://example.com/b');
    expect(anchors.first().prop('children')).toBe('banana');
  });
});

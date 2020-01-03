/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {mount} from 'enzyme';

import {
  Unstable_TableBuilder,
  Unstable_TableBuilderColumn,
  StyledTableHeadCellSortable,
  StyledTableBodyRow,
  StyledTableBodyCell,
  StyledSortAscIcon,
  StyledSortDescIcon,
  StyledSortNoneIcon,
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
    const wrapper = mount(
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
    const wrapper = mount(
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
    const wrapper = mount(
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
    expect(anchors.at(0).prop('href')).toBe('https://example.com/b');
    expect(anchors.at(0).prop('children')).toBe('banana');
  });

  it('renders sorted results', () => {
    const asc = mount(
      <Unstable_TableBuilder data={DATA} sortColumn={'foo'} sortOrder={'ASC'}>
        <Unstable_TableBuilderColumn header="Foo" id="foo" numeric sortable>
          {row => row.foo}
        </Unstable_TableBuilderColumn>
        <Unstable_TableBuilderColumn header="Bar" id="bar" sortable>
          {row => <a href={row.url}>{row.bar}</a>}
        </Unstable_TableBuilderColumn>
      </Unstable_TableBuilder>,
    );

    expect(asc.find(StyledSortAscIcon)).toHaveLength(1);
    expect(asc.find(StyledSortDescIcon)).toHaveLength(0);
    expect(asc.find(StyledSortNoneIcon)).toHaveLength(1);

    const desc = mount(
      <Unstable_TableBuilder data={DATA} sortColumn={'bar'} sortOrder={'DESC'}>
        <Unstable_TableBuilderColumn header="Foo" id="foo" numeric sortable>
          {row => row.foo}
        </Unstable_TableBuilderColumn>
        <Unstable_TableBuilderColumn header="Bar" id="bar" sortable>
          {row => <a href={row.url}>{row.bar}</a>}
        </Unstable_TableBuilderColumn>
      </Unstable_TableBuilder>,
    );

    expect(desc.find(StyledSortAscIcon)).toHaveLength(0);
    expect(desc.find(StyledSortDescIcon)).toHaveLength(1);
    expect(desc.find(StyledSortNoneIcon)).toHaveLength(1);

    const none = mount(
      <Unstable_TableBuilder data={DATA}>
        <Unstable_TableBuilderColumn header="Foo" id="foo" numeric sortable>
          {row => row.foo}
        </Unstable_TableBuilderColumn>
        <Unstable_TableBuilderColumn header="Bar" id="bar" sortable>
          {row => <a href={row.url}>{row.bar}</a>}
        </Unstable_TableBuilderColumn>
      </Unstable_TableBuilder>,
    );

    expect(none.find(StyledSortAscIcon)).toHaveLength(0);
    expect(none.find(StyledSortDescIcon)).toHaveLength(0);
    expect(none.find(StyledSortNoneIcon)).toHaveLength(2);
  });

  it('executes onSort with column id when header is clicked', () => {
    const mockOnSort = jest.fn();

    const wrapper = mount(
      <Unstable_TableBuilder data={DATA} onSort={mockOnSort}>
        <Unstable_TableBuilderColumn header="Foo" id="foo" sortable>
          {row => row.foo}
        </Unstable_TableBuilderColumn>
        <Unstable_TableBuilderColumn header="Bar" id="bar" sortable>
          {row => <a href={row.url}>{row.bar}</a>}
        </Unstable_TableBuilderColumn>
      </Unstable_TableBuilder>,
    );

    wrapper
      .find(StyledTableHeadCellSortable)
      .at(0)
      .simulate('click');

    wrapper
      .find(StyledTableHeadCellSortable)
      .at(1)
      .simulate('click');

    expect(mockOnSort.mock.calls.length).toBe(2);
    expect(mockOnSort.mock.calls[0][0]).toBe('foo');
    expect(mockOnSort.mock.calls[1][0]).toBe('bar');
  });
});

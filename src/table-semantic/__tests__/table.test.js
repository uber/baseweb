/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {shallow} from 'enzyme';

import {Table} from '../table.js';

describe('Table', () => {
  it('renders expected rows and columns', () => {
    const columns = [
      {
        key: 'foo',
        header: 'Foo',
        Cell: ({row}) => row.foo,
        isNumeric: true,
        isSortable: true,
      },
      {
        key: 'bar',
        header: 'Bar',
        Cell: ({row}) => row.bar,
        isLiteral: true,
      },
      {
        key: 'baz',
        header: 'Baz',
        Cell: ({row}) => row.foo + row.bar,
      },
    ];

    const rows = [
      {key: 'a', foo: 'a', bar: 'a'},
      {key: 'b', foo: 'b', bar: 'b'},
      {key: 'c', foo: 'c', bar: 'c'},
    ];

    expect(
      shallow(
        <Table
          columns={columns}
          rows={rows}
          sortKey="foo"
          sortOrder="ASC"
          onSort={() => {}}
        />,
      ),
    ).toMatchSnapshot();
  });
});

// @flow
import * as React from 'react';
import {Table} from 'baseui/table-semantic';

const COLUMNS = ['Name', 'Age', 'Address'];

const DATA = [
  ['Sarah Brown', 31, '100 Broadway St., New York City, New York'],
  ['Jane Smith', 32, '100 Market St., San Francisco, California'],
  ['Joe Black', 33, '100 Macquarie St., Sydney, Australia'],
];

export default function Example() {
  return <Table columns={COLUMNS} data={DATA} />;
}

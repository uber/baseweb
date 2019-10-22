// @flow
import * as React from 'react';
import {Unstable_Table} from 'baseui/table-semantic';

const COLUMNS = ['Name', 'Age', 'Address'];

const DATA = [
  ['Sarah Brown', 31, '100 Broadway st. New York City, New York'],
  ['Jane Smith', 32, '100 Market st. San Francisco, California'],
  ['Joe Black', 33, '100 Macquarie st. Sydney, Australia'],
];

export default () => (
  <Unstable_Table columns={COLUMNS} data={DATA} />
);

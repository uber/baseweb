import * as React from 'react';
import {useStyletron} from 'baseui';
import {Table} from 'baseui/table';

const DATA = [
  [
    1,
    'Sarah',
    'Brown',
    31,
    '100 Broadway st. New York City, New York',
  ],
  [
    2,
    'Jane',
    'Smith',
    32,
    '100 Market st. San Francisco, California',
  ],
  [3, 'Joe', 'Black', 33, '100 Macquarie st. Sydney, Australia'],
  [
    1,
    'Sarah',
    'Brown',
    31,
    '100 Broadway st. New York City, New York',
  ],
  [
    2,
    'Jane',
    'Smith',
    32,
    '100 Market st. San Francisco, California',
  ],
  [3, 'Joe', 'Black', 33, '100 Macquarie st. Sydney, Australia'],
  [
    1,
    'Sarah',
    'Brown',
    31,
    '100 Broadway st. New York City, New York',
  ],
  [
    2,
    'Jane',
    'Smith',
    32,
    '100 Market st. San Francisco, California',
  ],
  [3, 'Joe', 'Black', 33, '100 Macquarie st. Sydney, Australia'],
  [
    1,
    'Sarah',
    'Brown',
    31,
    '100 Broadway st. New York City, New York',
  ],
  [
    2,
    'Jane',
    'Smith',
    32,
    '100 Market st. San Francisco, California',
  ],
  [3, 'Joe', 'Black', 33, '100 Macquarie st. Sydney, Australia'],
];

const COLUMNS = ['Id', 'First Name', 'Last Name', 'Age', 'Address'];

export default () => {
  const [css] = useStyletron();
  return (
    <div className={css({height: '400px'})}>
      <Table
        columns={COLUMNS}
        data={DATA}
        horizontalScrollWidth="1000px"
      />
    </div>
  );
};

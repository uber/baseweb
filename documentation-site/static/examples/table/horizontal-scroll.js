import React from 'react';
import {styled} from 'baseui';
import {Table} from 'baseui/table';

const DATA = [
  [1, 'Sarah', 'Brown', 31, '100 Broadway st. New York City, New York'],
  [2, 'Jane', 'Smith', 32, '100 Market st. San Francisco, California'],
  [3, 'Joe', 'Black', 33, '100 Macquarie st. Sydney, Australia'],
  [1, 'Sarah', 'Brown', 31, '100 Broadway st. New York City, New York'],
  [2, 'Jane', 'Smith', 32, '100 Market st. San Francisco, California'],
  [3, 'Joe', 'Black', 33, '100 Macquarie st. Sydney, Australia'],
  [1, 'Sarah', 'Brown', 31, '100 Broadway st. New York City, New York'],
  [2, 'Jane', 'Smith', 32, '100 Market st. San Francisco, California'],
  [3, 'Joe', 'Black', 33, '100 Macquarie st. Sydney, Australia'],
  [1, 'Sarah', 'Brown', 31, '100 Broadway st. New York City, New York'],
  [2, 'Jane', 'Smith', 32, '100 Market st. San Francisco, California'],
  [3, 'Joe', 'Black', 33, '100 Macquarie st. Sydney, Australia'],
];

const COLUMNS = ['Id', 'First Name', 'Last Name', 'Age', 'Address'];

const Container = styled('div', {
  height: '400px',
});

export default () => (
  <Container>
    <Table columns={COLUMNS} data={DATA} horizontalScrollWidth="1000px" />
  </Container>
);

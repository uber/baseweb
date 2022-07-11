/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import React from 'react';
import { useStyletron } from '../../styles/index';
import { Table, DIVIDER, SIZE } from '../index';

const COLUMNS = ['Name', 'Age', 'Address'];

const DATA = [
  ['Sarah Brown', 31, '100 Broadway St., New York City, New York'],
  ['Jane Smith', 32, '100 Market St., San Francisco, California'],
  ['Joe Black', 33, '100 Macquarie St., Sydney, Australia'],
];

export function Scenario() {
  const [css, theme] = useStyletron();

  const title = css({
    ...theme.typography.ParagraphMedium,
    color: theme.colors.contentPrimary,
  });

  return (
    <div style={{ padding: '24px' }}>
      <p className={title}>horizontal / default</p>
      <Table divider={DIVIDER.horizontal} size={SIZE.compact} columns={COLUMNS} data={DATA} />

      <p className={title}>vertical</p>
      <Table divider={DIVIDER.vertical} size={SIZE.compact} columns={COLUMNS} data={DATA} />

      <p className={title}>grid</p>
      <Table divider={DIVIDER.grid} size={SIZE.compact} columns={COLUMNS} data={DATA} />

      <p className={title}>clean</p>
      <Table divider={DIVIDER.clean} size={SIZE.compact} columns={COLUMNS} data={DATA} />
    </div>
  );
}

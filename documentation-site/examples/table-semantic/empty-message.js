// @flow
import * as React from 'react';
import {Table} from 'baseui/table-semantic';

const COLUMNS = ['Name', 'Age', 'Address'];

export default () => (
  <Table columns={COLUMNS} data={[]} emptyMessage="No data" />
);

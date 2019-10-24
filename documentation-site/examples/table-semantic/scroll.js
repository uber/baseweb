// @flow
import * as React from 'react';
import {Unstable_Table} from 'baseui/table-semantic';

const SIZER = Array(100).fill();

const COLUMNS = SIZER.map((col, colIndex) => {
  return `Column ${colIndex + 1}`;
});

const DATA = SIZER.map((row, rowIndex) => {
  return SIZER.map((col, colIndex) => {
    return `Row ${rowIndex + 1}.${colIndex + 1}`;
  });
});

const overrides = {
  Root: {
    style: {
      maxHeight: '300px',
    },
  },
};

export default () => (
  <Unstable_Table
    overrides={overrides}
    columns={COLUMNS}
    data={DATA}
  />
);

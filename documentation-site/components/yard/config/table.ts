/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import { Table } from 'baseui/table';
import { PropTypes } from 'react-view';
import type { TConfig } from '../types';

const TableConfig: TConfig = {
  componentName: 'Table',
  imports: {
    'baseui/table': {
      named: ['Table'],
    },
  },
  scope: { Table },
  theme: [
    'tableHeadBackgroundColor',
    'tableBackground',
    'tableStripedBackground',
    'tableFilter',
    'tableFilterHeading',
    'tableFilterBackground',
    'tableFilterFooterBackground',
  ],
  props: {
    columns: {
      value: `['Name', 'Age', 'Address']`,
      type: PropTypes.Array,
      description: 'Table columns. Data passed to each header cell.',
    },
    data: {
      value: `[
  ['Sarah Brown', 31, '100 Broadway st. New York City, New York'],
  ['Jane Smith', 32, '100 Market st. San Francisco, California'],
]`,
      type: PropTypes.Array,
      description: 'Table rows. Data passed to each row and cell',
    },
    'aria-label': {
      value: undefined,
      type: PropTypes.String,
      description: 'Aria-label attribute',
      hidden: true,
    },
    horizontalScrollWidth: {
      value: undefined,
      type: PropTypes.String,
      description: 'Table width fills this provided value.',
    },
    isLoading: {
      value: false,
      type: PropTypes.Boolean,
      description: 'Lets you specify loading state.',
    },
    overrides: {
      value: undefined,
      type: PropTypes.Custom,
      description: 'Lets you customize all aspects of the component.',
      custom: {
        names: [],
        sharedProps: {},
      },
    },
  },
};

export default TableConfig;

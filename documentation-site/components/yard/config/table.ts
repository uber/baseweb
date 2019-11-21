import {Table} from 'baseui/table';
import {PropTypes} from 'react-view';
import {TConfig} from '../types';

const tableProps = require('!!extract-react-types-loader!../../../../src/table/table.js');

const TableConfig: TConfig = {
  imports: {
    'baseui/table': {
      named: ['Table'],
    },
  },
  scope: {Table},
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
    horizontalScrollWidth: {
      value: undefined,
      type: PropTypes.String,
      description: 'Table width fills this provided value.',
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
  mapTokensToProps: {
    Table: tableProps,
  },
};

export default TableConfig;

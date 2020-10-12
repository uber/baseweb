import {Table} from 'baseui/table-semantic';
import {PropTypes} from 'react-view';
import {TConfig} from '../types';

const TableSemanticConfig: TConfig = {
  componentName: 'Table',
  imports: {
    'baseui/table-semantic': {
      named: ['Table'],
    },
  },
  scope: {Table},
  theme: [
    'tableHeadBackgroundColor',
    'tableBackground',
    'tableStripedBackground',
  ],
  props: {
    columns: {
      value: `['Name', 'Age', 'Address']`,
      type: PropTypes.Array,
      description: 'Table columns. Data passed to each header cell.',
    },
    data: {
      value: `[
  ['Sarah Brown', 31, '100 Broadway St., New York City, New York'],
  ['Jane Smith', 32, '100 Market St., San Francisco, California'],
]`,
      type: PropTypes.Array,
      description: 'Table rows. Data passed to each row and cell',
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
    loadingMessage: {
      value: '',
      type: PropTypes.ReactNode,
      description: `Loading message.`,
    },
    emptyMessage: {
      value: '',
      type: PropTypes.ReactNode,
      description: `Empty message.`,
    },
    overrides: {
      value: undefined,
      type: PropTypes.Custom,
      description: 'Lets you customize all aspects of the component.',
      custom: {
        names: [
          'Root',
          'Table',
          'TableHead',
          'TableHeadRow',
          'TableHeadCell',
          'TableHeadCellSortable',
          'TableBody',
          'TableBodyRow',
          'TableBodyCell',
          'TableLoadingMessage',
          'TableEmptyMessage',
          'SortAscIcon',
          'SortDescIcon',
          'SortNoneIcon',
        ],
        sharedProps: {},
      },
    },
  },
};

export default TableSemanticConfig;

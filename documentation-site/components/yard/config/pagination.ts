import { Pagination, SIZE } from 'baseui/pagination';
import { PropTypes } from 'react-view';
import { TConfig } from '../types';
import selectConfig from './select';

const paginationProps = require('!!extract-react-types-loader!../../../../src/pagination/pagination.js');

const PaginationConfig: TConfig = {
  componentName: 'Pagination',
  imports: {
    'baseui/pagination': {
      named: ['Pagination'],
    },
  },
  scope: { Pagination, SIZE },
  theme: [],
  props: {
    numPages: {
      value: 20,
      type: PropTypes.Number,
      description: 'The total number of pages available.',
    },
    size: {
      value: 'SIZE.default',
      defaultValue: 'SIZE.default',
      options: SIZE,
      type: PropTypes.Enum,
      description: 'Renders component in provided size.',
      imports: {
        'baseui/pagination': {
          named: ['SIZE'],
        },
      },
    },
    currentPage: {
      value: 1,
      type: PropTypes.Number,
      description: 'The currently selected page.',
      stateful: true,
    },
    onPageChange: {
      value: `({nextPage}) => {
  setCurrentPage(
    Math.min(
      Math.max(nextPage, 1),
      20,
    )
  );
}`,
      type: PropTypes.Function,
      description: `Function called when page is changed.`,
      propHook: {
        what: 'Math.min(Math.max(nextPage, 1), 20)',
        into: 'currentPage',
      },
    },
    overrides: {
      value: undefined,
      type: PropTypes.Custom,
      description: 'Lets you customize all aspects of the component.',
      custom: {
        names: ['Root', 'MaxLabel', 'DropdownContainer', selectConfig, 'NextButton', 'PrevButton'],
        sharedProps: {},
      },
    },
  },
  mapTokensToProps: {
    Pagination: paginationProps,
  },
};

export default PaginationConfig;

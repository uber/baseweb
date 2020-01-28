import {Pagination} from 'baseui/pagination';
import {PropTypes} from 'react-view';
import {TConfig} from '../types';

const paginationProps = require('!!extract-react-types-loader!../../../../src/pagination/pagination.js');

const PaginationConfig: TConfig = {
  imports: {
    'baseui/pagination': {
      named: ['Pagination'],
    },
  },
  scope: {Pagination},
  theme: ['paginationTriangleDown'],
  props: {
    numPages: {
      value: 20,
      type: PropTypes.Number,
      description: 'The total number of pages available.',
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
        names: [
          'Root',
          'MaxLabel',
          'DropdownContainer',
          'Select',
          'NextButton',
          'PrevButton',
        ],
        sharedProps: {},
      },
    },
  },
  mapTokensToProps: {
    Pagination: paginationProps,
  },
};

export default PaginationConfig;

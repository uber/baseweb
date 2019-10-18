import {Pagination} from 'baseui/pagination';
import {PropTypes} from '../const';
import {TConfig} from '../types';

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
      type: PropTypes.Overrides,
      description: 'Lets you customize all aspects of the component.',
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
};

export default PaginationConfig;

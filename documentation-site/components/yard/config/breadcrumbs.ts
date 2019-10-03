import {Breadcrumbs} from 'baseui/breadcrumbs';
import {PropTypes} from '../const';
import {TConfig} from '../types';

const BreadcrumbsConfig: TConfig = {
  imports: {
    'baseui/breadcrumbs': {
      named: ['Breadcrumbs'],
    },
  },
  scope: {Breadcrumbs},
  theme: ['breadcrumbsText', 'breadcrumbsSeparatorFill'],
  props: {
    children: {
      value: '<span>hello</span><span>world</span>',
      type: PropTypes.ReactNode,
      description: 'Elements separated by divider',
    },
    ariaLabel: {
      value: undefined,
      type: PropTypes.String,
    },
    overrides: {
      value: undefined,
      type: PropTypes.Overrides,
      description: 'Lets you customize all aspects of the component.',
      names: ['Root', 'Separator', 'List', 'ListItem', 'Icon'],
      sharedProps: {},
    },
  },
};

export default BreadcrumbsConfig;

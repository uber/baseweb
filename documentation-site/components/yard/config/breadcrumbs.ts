import {Breadcrumbs} from 'baseui/breadcrumbs';
import {StyledLink} from 'baseui/link';
import {PropTypes} from '../const';
import {TConfig} from '../types';

const BreadcrumbsConfig: TConfig = {
  imports: {
    'baseui/breadcrumbs': {
      named: ['Breadcrumbs'],
    },
  },
  scope: {Breadcrumbs, StyledLink},
  theme: ['breadcrumbsText', 'breadcrumbsSeparatorFill'],
  props: {
    children: {
      value: `
        <StyledLink href="#basic-parent">Parent Page</StyledLink>
        <StyledLink href="#basic-subparent">Sub-Parent Page</StyledLink>
        <span>Current Page</span>
      `,
      type: PropTypes.ReactNode,
      description: 'Elements separated by divider',
      imports: {
        'baseui/link': {named: ['StyledLink']},
      },
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

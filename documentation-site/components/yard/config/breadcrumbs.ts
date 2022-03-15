import { Breadcrumbs } from 'baseui/breadcrumbs';
import { StyledLink } from 'baseui/link';
import { PropTypes } from 'react-view';
import { TConfig } from '../types';
import iconConfig from './icon';

const breadcrumbsProps = require('!!extract-react-types-loader!../../../../src/breadcrumbs/breadcrumbs.js');

const BreadcrumbsConfig: TConfig = {
  componentName: 'Breadcrumbs',
  imports: {
    'baseui/breadcrumbs': {
      named: ['Breadcrumbs'],
    },
  },
  scope: { Breadcrumbs, StyledLink },
  theme: ['breadcrumbsText', 'breadcrumbsSeparatorFill'],
  props: {
    children: {
      value: `<StyledLink href="#parent">
  Parent Page
</StyledLink>
<StyledLink href="#sub">
  Sub-Parent Page
</StyledLink>
<span>Current Page</span>
`,
      type: PropTypes.ReactNode,
      description: 'Elements separated by divider',
      imports: {
        'baseui/link': { named: ['StyledLink'] },
      },
    },
    'aria-label': {
      value: undefined,
      description: 'Aria-label attribute',
      type: PropTypes.String,
    },
    showTrailingSeparator: {
      value: false,
      type: PropTypes.Boolean,
      description: 'Whether to show a trailing separator after the last breadcrumb.',
    },
    overrides: {
      value: undefined,
      type: PropTypes.Custom,
      description: 'Lets you customize all aspects of the component.',
      custom: {
        names: ['Root', 'Separator', 'List', 'ListItem', { ...iconConfig, componentName: 'Icon' }],
        sharedProps: {},
      },
    },
  },
  mapTokensToProps: {
    Breadcrumbs: breadcrumbsProps,
  },
};

export default BreadcrumbsConfig;

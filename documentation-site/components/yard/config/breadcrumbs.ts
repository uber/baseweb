import {Breadcrumbs} from 'spaceweb/breadcrumbs';
import {StyledLink} from 'spaceweb/link';
import {PropTypes} from 'react-view';
import {TConfig} from '../types';

const breadcrumbsProps = require('!!extract-react-types-loader!../../../../src/breadcrumbs/breadcrumbs.js');

const BreadcrumbsConfig: TConfig = {
  componentName: 'Breadcrumbs',
  imports: {
    'baseui/breadcrumbs': {
      named: ['Breadcrumbs'],
    },
  },
  scope: {Breadcrumbs, StyledLink},
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
        'baseui/link': {named: ['StyledLink']},
      },
    },
    ariaLabel: {
      value: undefined,
      description: 'Elements separated by divider',
      type: PropTypes.String,
    },
    overrides: {
      value: undefined,
      type: PropTypes.Custom,
      description: 'Lets you customize all aspects of the component.',
      custom: {
        names: ['Root', 'Separator', 'List', 'ListItem', 'Icon'],
        sharedProps: {},
      },
    },
  },
  mapTokensToProps: {
    Breadcrumbs: breadcrumbsProps,
  },
};

export default BreadcrumbsConfig;

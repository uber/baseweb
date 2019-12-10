import {StyledLink} from 'baseui/link';
import {PropTypes} from 'react-view';
import {TConfig} from '../types';

const LinkConfig: TConfig = {
  imports: {
    'baseui/link': {
      named: ['StyledLink'],
    },
  },
  scope: {StyledLink},
  theme: ['linkText', 'linkVisited', 'linkHover', 'linkActive'],
  props: {
    children: {
      value: 'Link to Base Web',
      type: PropTypes.ReactNode,
      description: `Link's content.`,
    },
    href: {
      value: 'https://baseweb.design',
      type: PropTypes.String,
      description: 'The URL that the hyperlink points to.',
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

export default LinkConfig;

/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import {
  HeaderNavigation,
  ALIGN,
  StyledNavigationItem,
  StyledNavigationList,
} from 'baseui/header-navigation';
import { StyledLink } from 'baseui/link';
import { Button } from 'baseui/button';
import { PropTypes } from 'react-view';
import type { TConfig } from '../types';

const HeaderNavigationConfig: TConfig = {
  componentName: 'HeaderNavigation',
  imports: {
    'baseui/header-navigation': {
      named: ['HeaderNavigation', 'ALIGN', 'StyledNavigationList', 'StyledNavigationItem'],
    },
    'baseui/link': {
      named: ['StyledLink'],
    },
    'baseui/button': {
      named: ['Button'],
    },
  },
  scope: {
    HeaderNavigation,
    ALIGN,
    StyledNavigationItem,
    StyledNavigationList,
    StyledLink,
    Button,
  },
  theme: [],
  props: {
    children: {
      value: `<StyledNavigationList $align={ALIGN.left}>
<StyledNavigationItem>Uber</StyledNavigationItem>
</StyledNavigationList>
<StyledNavigationList $align={ALIGN.center} />
<StyledNavigationList $align={ALIGN.right}>
<StyledNavigationItem>
<StyledLink href="#basic-link1">Tab Link One</StyledLink>
</StyledNavigationItem>
<StyledNavigationItem>
<StyledLink href="#basic-link2">Tab Link Two</StyledLink>
</StyledNavigationItem>
</StyledNavigationList>
<StyledNavigationList $align={ALIGN.right}>
<StyledNavigationItem>
<Button>Get started</Button>
</StyledNavigationItem>
</StyledNavigationList>
`,
      type: PropTypes.ReactNode,
      description: 'Header navigation content.',
    },
    overrides: {
      value: undefined,
      type: PropTypes.Custom,
      description: 'Lets you customize all aspects of the component.',
      custom: {
        names: ['Root'],
        sharedProps: {},
      },
    },
  },
};

export default HeaderNavigationConfig;

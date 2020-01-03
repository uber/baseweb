/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {StyledLink as Link} from '../../link/index.js';
import {Breadcrumbs} from '../index.js';

export const name = 'breadcrumbs-pseudo';

export const component = () => (
  <Breadcrumbs
    overrides={{
      ListItem: {
        style: ({$itemIndex, $theme}) => {
          if ($itemIndex === 0) return {};
          return {
            ':before': {
              content: "'>'",
              color: $theme.colors.mono700,
              marginLeft: $theme.sizing.scale400,
              marginRight: $theme.sizing.scale400,
              ...$theme.typography.font450,
            },
          };
        },
      },
      Separator: {
        component: () => null,
      },
    }}
  >
    <Link href="#">Parent Page</Link>
    <Link href="#">Sub-Parent Page</Link>
    <span>Current Page</span>
  </Breadcrumbs>
);

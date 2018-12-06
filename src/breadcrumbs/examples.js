/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import React from 'react';

import type {ThemeT} from '../styles/types.js';
import {StyledLink} from '../link/index.js';
import {Breadcrumbs} from './index.js';
import examples from './examples-list.js';

export default {
  [examples.DEFAULT]: function Story1() {
    return (
      <Breadcrumbs>
        <StyledLink href="#">Parent Page</StyledLink>
        <StyledLink href="#">Sub-Parent Page</StyledLink>
        <span>Current Page</span>
      </Breadcrumbs>
    );
  },
  [examples.OVERRIDES]: function Story2() {
    return (
      <Breadcrumbs
        overrides={{
          Separator: {
            style: ({$theme}: {$theme: ThemeT}) => ({
              color: $theme.colors.negative400,
            }),
          },
        }}
      >
        <StyledLink href="#">Parent Page</StyledLink>
        <StyledLink href="#">Sub-Parent Page</StyledLink>
        <span>Current Page</span>
      </Breadcrumbs>
    );
  },
};

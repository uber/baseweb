/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {Cell, Grid} from '../layout-grid/index.js';
import MainMenuItem from './main-menu-item.js';
import {KIND} from './constants.js';
import {
  StyledSubnavContainer,
  StyledSecondaryMenuContainer,
} from './styled-components.js';
import type {SecondaryMenuT} from './types.js';

export default function AppNavBar(props: SecondaryMenuT) {
  const {nav = [], isNavItemActive = params => {}, onNavItemSelect} = props;
  return (
    <StyledSubnavContainer>
      <Grid>
        <Cell span={[0, 8, 12]}>
          <StyledSecondaryMenuContainer
            role="navigation"
            aria-label="Secondary navigation"
          >
            {nav.map((item, index) => (
              // Replace with a menu item renderer
              <MainMenuItem
                active={
                  item.active !== undefined
                    ? item.active
                    : isNavItemActive({item})
                }
                item={item}
                kind={KIND.secondary}
                key={index}
                onSelect={onNavItemSelect}
              />
            ))}
          </StyledSecondaryMenuContainer>
        </Cell>
      </Grid>
    </StyledSubnavContainer>
  );
}

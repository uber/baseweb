/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import React, {Children} from 'react';

import type {BreadcrumbsPropsT} from './types.js';
import {StyledRoot, StyledSeparator, StyledIcon} from './styled-components.js';
import {getOverrides} from '../helpers/overrides.js';

function Breadcrumbs({children, overrides = {}}: BreadcrumbsPropsT) {
  const numChildren = Children.count(children);
  const childrenWithSeparators = [];

  const [Root, baseRootProps] = getOverrides(overrides.Root, StyledRoot);
  const [Icon, baseIconProps] = getOverrides(overrides.Icon, StyledIcon);
  const [Separator, baseSeparatorProps] = getOverrides(
    overrides.Separator,
    StyledSeparator,
  );

  Children.forEach(children, (child, index) => {
    childrenWithSeparators.push(child);

    if (index !== numChildren - 1) {
      childrenWithSeparators.push(
        <Separator {...baseSeparatorProps} key={index}>
          <Icon {...baseIconProps} />
        </Separator>,
      );
    }
  });

  return (
    <Root aria-label="Breadcrumbs navigation" {...baseRootProps}>
      {childrenWithSeparators}
    </Root>
  );
}

Breadcrumbs.defaultProps = {
  overrides: {},
};

export default Breadcrumbs;

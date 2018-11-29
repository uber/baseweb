/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import React, {Children} from 'react';
import type {BreadcrumbsPropsT} from './types';
import {StyledRoot, StyledSeparator, StyledIcon} from './styled-components';
import {getOverrides} from '../helpers/overrides';

function Breadcrumbs({children, overrides = {}}: BreadcrumbsPropsT) {
  const numChildren = Children.count(children);
  const mappedChildren = [];

  const [Root, baseRootProps] = getOverrides(overrides.Root, StyledRoot);
  const [Icon, baseIconProps] = getOverrides(overrides.Icon, StyledIcon);
  const [Separator, baseSeparatorProps] = getOverrides(
    overrides.Separator,
    StyledSeparator,
  );

  Children.forEach(children, (child, index) => {
    mappedChildren.push(child);

    if (index !== numChildren - 1) {
      mappedChildren.push(
        <Separator {...baseSeparatorProps} key={index}>
          <Icon {...baseIconProps} />
        </Separator>,
      );
    }
  });

  return (
    <Root aria-label="Breadcrumbs navigation" {...baseRootProps}>
      {mappedChildren}
    </Root>
  );
}

Breadcrumbs.defaultProps = {
  overrides: {},
};

export default Breadcrumbs;

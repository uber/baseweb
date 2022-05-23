/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import { getOverrides } from '../helpers/overrides.js';
import { StyledInlineBadge } from './styled-components.js';
import { SHAPE, HIERARCHY } from './constants.js';
import type { InlineBadgePropsT } from './types.js';

const InlineBadge = ({
  children,
  color,
  shape,
  hierarchy,
  hidden,
  overrides = {},
}: InlineBadgePropsT) => {
  const [Badge, badgeProps] = getOverrides(overrides.Badge, StyledInlineBadge);

  if (__DEV__) {
    if (shape === SHAPE.pill && hierarchy === HIERARCHY.secondary) {
      console.warn('Pill badges should only be used with primary hierarchy');
    }
  }

  return (
    <Badge {...badgeProps} $shape={shape} $color={color} $hierarchy={hierarchy} $hidden={hidden}>
      {children}
    </Badge>
  );
};
export default InlineBadge;

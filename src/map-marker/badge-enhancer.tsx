/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import * as React from 'react';
import type { BadgeEnhancerComponent } from './types';
import { getOverrides } from '../helpers/overrides';
import { StyledBadgeEnhancerRoot } from './styled-components';
import {
  PINHEAD_TYPES,
  BADGE_ENHANCER_SIZES,
  BADGE_ENHANCER_POSITIONS,
  BADGE_ENHANCER_CONTENT_SIZE,
} from './constants';

const BadgeEnhancer = ({
  pinHeadSize,
  markerType,
  badgeEnhancerSize = BADGE_ENHANCER_SIZES.none,
  badgeEnhancerContent: BadgeEnhancerContent,
  overrides = {},
}: BadgeEnhancerComponent) => {
  if (badgeEnhancerSize === null || badgeEnhancerSize == BADGE_ENHANCER_SIZES.none) {
    return null;
  }
  if (badgeEnhancerSize !== BADGE_ENHANCER_SIZES.xSmall && !BadgeEnhancerContent) {
    if (__DEV__) {
      console.warn(`Badges (except for size ${BADGE_ENHANCER_SIZES.xSmall}) must contain content`);
    }
    return null;
  }
  if (markerType === PINHEAD_TYPES.floating) {
    if (__DEV__) {
      console.warn(`Badges can only be rendered on fixed markers`);
    }
    return null;
  }
  const positions = BADGE_ENHANCER_POSITIONS[pinHeadSize];
  const position = positions ? positions[badgeEnhancerSize] : null;
  if (!position) {
    if (__DEV__) {
      console.warn(
        `Badge size ${badgeEnhancerSize} cannot be rendered with pinhead size ${pinHeadSize}`
      );
    }
    return null;
  }

  const [BadgeEnhancerRoot, badgeEnhancerRootProps] = getOverrides(
    overrides.BadgeEnhancer,
    StyledBadgeEnhancerRoot
  );

  return (
    // @ts-ignore TS2786 error with web-eats-v2, can remove once React 18 migration complete
    <BadgeEnhancerRoot $size={badgeEnhancerSize} $position={position} {...badgeEnhancerRootProps}>
      {BadgeEnhancerContent && badgeEnhancerSize !== BADGE_ENHANCER_SIZES.xSmall && (
        // @ts-ignore TS2786 error with web-eats-v2, can remove once React 18 migration complete
        <BadgeEnhancerContent size={BADGE_ENHANCER_CONTENT_SIZE[badgeEnhancerSize]} />
      )}
    </BadgeEnhancerRoot>
  );
};

export default BadgeEnhancer;

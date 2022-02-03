/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow
import * as React from 'react';
import type {BadgeEnhancerComponentT} from './types.js';
import {getOverrides} from '../helpers/overrides.js';
import {StyledBadgeEnhancerRoot} from './styled-components.js';
import {
  PINHEAD_TYPES,
  BADGE_ENHANCER_SIZES,
  BADGE_ENHANCER_POSITIONS,
  BADGE_ENHANCER_CONTENT_SIZE,
} from './constants.js';

const BadgeEnhancer = ({
  pinHeadSize,
  markerType,
  badgeEnhancerSize = BADGE_ENHANCER_SIZES.none,
  badgeEnhancerColor,
  badgeEnhancerBackground,
  badgeEnhancerContent: BadgeEnhancerContent,
  overrides = {},
}: BadgeEnhancerComponentT) => {
  if (
    badgeEnhancerSize === null ||
    badgeEnhancerSize == BADGE_ENHANCER_SIZES.none
  ) {
    return null;
  }
  if (
    badgeEnhancerSize !== BADGE_ENHANCER_SIZES.xSmall &&
    !BadgeEnhancerContent
  ) {
    console.warn(
      `Badges (except for size ${BADGE_ENHANCER_SIZES.xSmall}) must contain content`,
    );
    return null;
  }
  if (markerType === PINHEAD_TYPES.floating) {
    console.warn(`Badges can only be rendered on fixed markers`);
    return null;
  }
  const positions = BADGE_ENHANCER_POSITIONS[pinHeadSize];
  const position = positions ? positions[badgeEnhancerSize] : null;
  if (!position) {
    console.warn(
      `Badge size ${badgeEnhancerSize} cannot be rendered with pinhead size ${pinHeadSize}`,
    );
    return null;
  }

  const [BadgeEnhancerRoot, badgeEnhancerRootProps] = getOverrides(
    overrides.BadgeEnhancer,
    StyledBadgeEnhancerRoot,
  );

  return (
    <BadgeEnhancerRoot
      $size={badgeEnhancerSize}
      $position={position}
      $color={badgeEnhancerColor}
      $background={badgeEnhancerBackground}
      {...badgeEnhancerRootProps}
    >
      {BadgeEnhancerContent &&
        badgeEnhancerSize !== BADGE_ENHANCER_SIZES.xSmall && (
          <BadgeEnhancerContent
            size={BADGE_ENHANCER_CONTENT_SIZE[badgeEnhancerSize]}
          />
        )}
    </BadgeEnhancerRoot>
  );
};

export default BadgeEnhancer;

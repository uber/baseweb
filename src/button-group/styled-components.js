/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import {withStyle} from 'styletron-react';

import {
  StyledBaseButton as StyledGenericButton,
  KIND,
} from '../button/index.js';
import {styled} from '../styles/index.js';

import type {StylePropsT} from './types.js';

function getBackgroundColor({$kind, $selected, $theme}: StylePropsT) {
  switch ($kind) {
    case KIND.primary:
      return $theme.colors.buttonPrimaryHover;
    case KIND.secondary:
      return $theme.colors.buttonSecondaryHover;
    case KIND.tertiary:
      return $theme.colors.buttonTertiaryHover;
    case KIND.minimal:
      return $theme.colors.buttonMinimalHover;
    default:
      return null;
  }
}

// unsure why the flow annotation is required compared to other uses of `withStyle`.
// it should ultimately maintain the same resulting type as the input.
export const StyledButton = (withStyle(
  StyledGenericButton,
  (props: StylePropsT) => {
    const style = {};

    if (props.$selected) {
      style.backgroundColor = getBackgroundColor(props);
    }

    if (props.$first) {
      style.borderTopRightRadius = 0;
      style.borderBottomRightRadius = 0;
    } else if (props.$last) {
      style.borderTopLeftRadius = 0;
      style.borderBottomLeftRadius = 0;
    } else {
      style.borderTopRightRadius = 0;
      style.borderBottomRightRadius = 0;
      style.borderTopLeftRadius = 0;
      style.borderBottomLeftRadius = 0;
    }

    return style;
  },
): typeof StyledGenericButton);
StyledButton.displayName = 'StyledButton';

export const StyledRoot = styled('div', {
  display: 'flex',
});
StyledRoot.displayName = 'StyledRoot';

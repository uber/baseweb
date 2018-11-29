/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import {styled} from '../styles/index';
import type {StyledRootPropsT} from './types';
import {KIND} from './constants';

export const StyledRoot = styled('div', ({$theme, $kind}: StyledRootPropsT) => {
  let color, backgroundColor;

  switch ($kind) {
    case KIND.success:
      color = $theme.colors.notificationSuccessText;
      backgroundColor = $theme.colors.notificationSuccessBackground;
      break;
    case KIND.warning:
      color = $theme.colors.notificationWarningText;
      backgroundColor = $theme.colors.notificationWarningBackground;
      break;
    case KIND.error:
      color = $theme.colors.notificationErrorText;
      backgroundColor = $theme.colors.notificationErrorBackground;
      break;
    default:
      color = $theme.colors.notificationPrimaryText;
      backgroundColor = $theme.colors.notificationPrimaryBackground;
  }

  return {
    ...$theme.typography.font350,
    borderRadius: $theme.borders.radius200,
    paddingTop: $theme.sizing.scale600,
    paddingRight: $theme.sizing.scale600,
    paddingBottom: $theme.sizing.scale600,
    paddingLeft: $theme.sizing.scale600,
    color,
    backgroundColor,
  };
});

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
  let color = $theme.colors.notificationPrimaryText;
  let backgroundColor = $theme.colors.notificationPrimaryBackground;

  if ($kind === KIND.success) {
    color = $theme.colors.notificationSuccessText;
    backgroundColor = $theme.colors.notificationSuccessBackground;
  } else if ($kind === KIND.warning) {
    color = $theme.colors.notificationWarningText;
    backgroundColor = $theme.colors.notificationWarningBackground;
  } else if ($kind === KIND.error) {
    color = $theme.colors.notificationErrorText;
    backgroundColor = $theme.colors.notificationErrorBackground;
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

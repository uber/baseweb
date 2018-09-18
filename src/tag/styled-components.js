/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import {styled, hexToRgb} from '../styles/index';

export const Action = styled('div', props => {
  const {$color, $disabled} = props;
  return {
    display: 'flex',
    alignItems: 'center',
    padding: '12px',
    borderTopRightRadius: '2px',
    borderBottomRightRadius: '2px',
    marginLeft: '8px',
    cursor: $disabled ? 'not-allowed' : 'pointer',
    ':hover': {
      backgroundColor: $disabled ? null : hexToRgb($color, '0.2'),
    },
  };
});

export const ActionIcon = styled('svg', () => {
  return {};
});

export const Root = styled('span', props => {
  const {$theme, $color, $disabled, $isFocused, $isActive} = props;
  const {
    sizing: {scale800, scale100, scale300},
    typography: {font200},
  } = $theme;
  return {
    ...font200,
    display: 'inline-flex',
    height: scale800,
    fontWeight: 'bold',
    margin: '5px',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: scale100,
    paddingBottom: scale100,
    paddingLeft: scale300,
    borderWidth: '1px',
    borderColor: $color,
    color: $color,
    opacity: $disabled ? '.56' : null,
    borderRadius: $theme.borders.useRoundedCorners
      ? $theme.borders.radius100
      : '0px',
    cursor: $disabled ? 'not-allowed' : 'auto',
    backgroundColor: hexToRgb($color, $isFocused || $isActive ? '0.2' : '0.06'),
    ':hover': {
      backgroundColor: $disabled ? null : hexToRgb($color, '0.2'),
    },
  };
});

/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import {styled} from '../styles/index';

function getBorderColor(props) {
  const {$checked, $isError, $theme} = props;
  const {colors} = $theme;
  return $isError
    ? colors.negative400
    : $checked
      ? colors.primary400
      : colors.mono700;
}

function getLabelPadding(props) {
  const {$labelPlacement = '', $theme} = props;
  const {
    sizing: {scale200},
  } = $theme;
  const paddingSide =
    'padding' + $labelPlacement.replace(/^\w/, c => c.toUpperCase());
  return {
    [paddingSide]: scale200,
  };
}
function getLabelColor(props) {
  const {$disabled, $theme} = props;
  const {colors} = $theme;
  return $disabled ? colors.mono600 : colors.mono1000;
}

export const RadioGroupRoot = styled('div', props => {
  const {$disabled, $align} = props;
  return {
    flexDirection: $align === 'horizontal' ? 'row' : 'column',
    display: 'flex',
    alignItems: $align === 'horizontal' ? 'center' : 'flex-start',
    cursor: $disabled ? 'not-allowed' : 'pointer',
  };
});

export const Root = styled('label', props => {
  const {$disabled, $labelPlacement} = props;
  return {
    flexDirection:
      $labelPlacement === 'top' || $labelPlacement === 'bottom'
        ? 'column'
        : 'row',
    display: 'flex',
    alignItems: 'center',
    cursor: $disabled ? 'not-allowed' : 'pointer',
  };
});

export const RadioMark = styled('span', props => {
  const {$checked, $disabled, $theme, $isFocused, $isError} = props;
  const {colors, animation} = $theme;
  const {
    sizing: {scale0, scale100, scale300, scale600},
  } = $theme;
  const activeStyle = {
    backgroundColor:
      $checked || $isError
        ? null
        : $isFocused
          ? colors.mono500
          : !$disabled && !$checked
            ? colors.mono400
            : null,
  };
  return {
    backgroundColor: 'transparent',
    borderRadius: '50%',
    borderWidth: $checked ? scale300 : scale0,
    width: $checked ? scale100 : scale600,
    height: $checked ? scale100 : scale600,
    backgroundImage: null,
    flex: '0 0 auto',
    transitionDuration: animation.timing100,
    transitionTimingFunction: animation.easeOutCurve,
    borderStyle: 'solid',
    borderColor: getBorderColor(props),
    display: 'inline-block',
    verticalAlign: 'middle',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    marginTop: $theme.sizing.scale200,
    marginBottom: $theme.sizing.scale200,
    marginLeft: $theme.sizing.scale200,
    marginRight: $theme.sizing.scale200,
    ':hover': activeStyle,
    ':active': activeStyle,
  };
});

export const Label = styled('div', props => {
  const {
    $theme: {typography},
  } = props;
  return {
    verticalAlign: 'middle',
    ...getLabelPadding(props),
    color: getLabelColor(props),
    ...typography.font400,
  };
});
// tricky style for focus event cause display: none doesn't work
export const Input = styled('input', {
  opacity: 0,
  width: 0,
  overflow: 'hidden',
  margin: 0,
  padding: 0,
});

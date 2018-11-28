/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import {styled} from '../styles/index';
import {TYPE} from './constants';
import {getSvgStyles} from '../icon/styled-components';
import {SIZE} from './constants';
import type {SharedStylePropsT} from './types';

function getFont(size = SIZE.default, typography) {
  return {
    [SIZE.default]: typography.font300,
    [SIZE.compact]: typography.font200,
  }[size];
}

function getControlPadding(size = SIZE.default, sizing, type) {
  return {
    [SIZE.default]: {
      paddingTop: sizing.scale400,
      paddingBottom: sizing.scale400,
      paddingLeft: type === TYPE.search ? sizing.scale1000 : sizing.scale500,
      paddingRight: type === TYPE.select ? sizing.scale1000 : sizing.scale800,
    },
    [SIZE.compact]: {
      paddingTop: sizing.scale200,
      paddingBottom: sizing.scale200,
      paddingLeft: type === TYPE.search ? sizing.scale1000 : sizing.scale500,
      paddingRight: type === TYPE.select ? sizing.scale1000 : sizing.scale800,
    },
  }[size];
}

export const StyledOptionContent = styled('div', props => {
  const {$isHighlighted, $selected, $disabled, $theme} = props;
  const {
    colors: {mono700, primary400, black},
  } = $theme;
  return {
    cursor: $disabled ? 'not-allowed' : 'pointer',
    color: $disabled
      ? mono700
      : $selected || $isHighlighted
        ? primary400
        : black,
    fontWeight: $selected ? 'bold' : 'normal',
  };
});

export const StyledRoot = styled('div', props => {
  const {
    $theme: {typography},
    $size,
  } = props;
  return {
    ...getFont($size, typography),
    boxSizing: 'border-box',
  };
});

export const StyledControlContainer = styled('div', props => {
  const {
    $disabled,
    $error,
    $isFocused,
    $isPseudoFocused,
    $type,
    $searchable,
    $theme: {colors, sizing, animation, borders},
  } = props;
  return {
    overflow: 'hidden',
    position: 'relative',
    color: $disabled ? colors.mono600 : colors.mono1000,
    boxSizing: 'border-box',
    display: 'flex',
    width: '100%',
    cursor: $disabled
      ? 'not-allowed'
      : $searchable || $type === TYPE.search
        ? 'text'
        : 'pointer',
    backgroundColor: $disabled
      ? colors.mono300
      : $isFocused || $isPseudoFocused
        ? colors.mono100
        : $error
          ? colors.negative50
          : colors.mono200,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: $disabled
      ? colors.mono300
      : $error
        ? colors.negative400
        : $isFocused || $isPseudoFocused
          ? colors.primary400
          : colors.mono200,
    borderRadius: borders.useRoundedCorners ? sizing.scale100 : '0',
    boxShadow: `0 2px 6px ${
      $disabled
        ? 'transparent'
        : $isFocused || $isPseudoFocused
          ? $error
            ? colors.shadowError
            : colors.shadowFocus
          : 'transparent'
    }`,
    transitionProperty: 'border, boxShadow, backgroundColor',
    transitionDuration: animation.timing100,
    transitionTimingFunction: animation.easeOutCurve,
  };
});

export const StyledValueContainer = styled('span', props => {
  const {
    $type,
    $size,
    $theme: {sizing},
  } = props;
  const padding = getControlPadding($size, sizing, $type);
  return {
    boxSizing: 'border-box',
    display: 'inline-block',
    paddingLeft: $type === TYPE.search ? padding.paddingLeft : 0,
  };
});

export const StyledPlaceholder = styled('div', props => {
  const {
    $disabled,
    $size,
    $type,
    $theme: {colors, sizing},
  } = props;
  return {
    position: 'absolute',
    top: '0',
    bottom: '0',
    right: '0',
    left: '0',
    display: 'flex',
    alignItems: 'center',
    color: $disabled ? colors.mono600 : colors.mono700,
    maxWidth: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    ...getControlPadding($size, sizing, $type),
  };
});

export const StyledSingleValue = styled('div', props => {
  const {
    $size,
    $type,
    $theme: {sizing},
  } = props;
  return {
    boxSizing: 'border-box',
    position: 'absolute',
    top: '0',
    left: '0',
    height: '100%',
    whiteSpace: 'nowrap',
    maxWidth: '100%',
    ...getControlPadding($size, sizing, $type),
  };
});

export const StyledInputContainer = styled('div', props => {
  const {
    $size,
    $type,
    $searchable,
    $theme: {sizing, typography},
  } = props;
  const padding = getControlPadding($size, sizing, $type);
  const font = getFont($size, typography);
  return {
    position: 'relative',
    display: 'inline-block',
    maxWidth: '100%',
    background: 'transparent',
    border: 'none',
    boxShadow: 'none',
    outline: 'none',
    marginTop: '0',
    marginBottom: '0',
    marginLeft: '0',
    marginRight: '0',
    ...padding,
    paddingLeft: $type === TYPE.search ? '0' : padding.paddingLeft,
    height: !$searchable ? font.lineHeight : 'auto',
    boxSizing: 'content-box',
  };
});

export const StyledInput = styled('input', props => {
  const {
    $theme: {typography},
    $size,
    $disabled,
    $searchable,
    $width,
  } = props;
  return {
    ...getFont($size, typography),
    boxSizing: 'content-box',
    width: $disabled || !$searchable ? '1px' : $width || 'auto',
    maxWidth: '100%',
    background: 'transparent',
    border: 'none',
    boxShadow: 'none',
    display: 'inline-block',
    outline: 'none',
    marginTop: '0',
    marginBottom: '0',
    marginLeft: '0',
    marginRight: '0',
    paddingTop: '0',
    paddingBottom: '0',
    paddingLeft: '0',
    paddingRight: '0',
  };
});

export const StyledInputSizer = styled('div', {
  position: 'absolute',
  top: 0,
  left: 0,
  visibility: 'hidden',
  height: 0,
  overflow: 'scroll',
  whiteSpace: 'pre',
});

export const StyledSelectArrow = styled('svg', (props: SharedStylePropsT) => {
  const {$theme, $disabled} = props;
  const {colors} = $theme;
  return {
    ...getSvgStyles({$theme}),
    color: $disabled ? colors.mono600 : colors.mono800,
    cursor: $disabled ? 'not-allowed' : 'pointer',
    position: 'absolute',
    right: '12px',
    display: 'inline-block',
    height: '100%',
  };
});

export const StyledClearIcon = styled('svg', (props: SharedStylePropsT) => {
  const {$type, $theme} = props;
  const {colors} = $theme;
  return {
    ...getSvgStyles({$theme}),
    color: colors.mono800,
    cursor: 'pointer',
    position: 'absolute',
    right: $type !== 'select' ? '14px' : '30px',
    display: 'inline-block',
    height: '100%',
  };
});

export const getLoadingIconStyles = (props: SharedStylePropsT) => {
  const {$type, $theme} = props;
  const {colors} = $theme;
  return {
    ...getSvgStyles({$theme}),
    color: colors.mono800,
    position: 'absolute',
    right: $type !== 'select' ? '14px' : '30px',
    display: 'inline-block',
    height: '100%',
  };
};

export const StyledSearchIcon = styled('svg', (props: SharedStylePropsT) => {
  const {$disabled, $theme} = props;
  const {colors} = $theme;
  return {
    ...getSvgStyles({$theme}),
    color: $disabled ? colors.mono600 : colors.mono700,
    cursor: $disabled ? 'not-allowed' : 'pointer',
    position: 'absolute',
    left: '12px',
    display: 'inline-block',
    height: '100%',
    zIndex: 1,
  };
});

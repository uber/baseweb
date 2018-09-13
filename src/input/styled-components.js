/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import {styled} from '../styles';
import {ADJOINED, SIZE, ENHANCER_POSITION} from './constants';
import type {SharedPropsT} from './types';

function getInputPadding(size, sizing) {
  return {
    [SIZE.default]: {
      paddingTop: sizing.scale400,
      paddingRight: sizing.scale500,
      paddingBottom: sizing.scale400,
      paddingLeft: sizing.scale500,
    },
    [SIZE.compact]: {
      paddingTop: sizing.scale200,
      paddingRight: sizing.scale500,
      paddingBottom: sizing.scale200,
      paddingLeft: sizing.scale500,
    },
  }[size];
}

function getBorderRadius(adjoined, radius) {
  return {
    [ADJOINED.none]: radius,
    [ADJOINED.left]: `0 ${radius} ${radius} 0`,
    [ADJOINED.right]: `${radius} 0 0 ${radius}`,
    [ADJOINED.both]: '0',
  }[adjoined];
}

function getDecoratorBorderRadius(position, radius) {
  return {
    [ENHANCER_POSITION.start]: `${radius} 0 0 ${radius}`,
    [ENHANCER_POSITION.end]: `0 ${radius} ${radius} 0`,
  }[position];
}

function getFont(size, typography) {
  return {
    [SIZE.default]: typography.font300,
    [SIZE.compact]: typography.font200,
  }[size];
}

export const Root = styled('div', props => {
  const {
    $size,
    $theme: {colors, typography},
  } = props;
  return {
    ...getFont($size, typography),
    color: colors.mono1000,
    display: 'flex',
    width: '100%',
  };
});

export const InputEnhancer = styled('div', props => {
  const {
    $position,
    $size,
    $theme: {colors, sizing, typography},
  } = props;
  return {
    ...getFont($size, typography),
    color: colors.mono900,
    display: 'flex',
    ...getInputPadding($size, sizing),
    backgroundColor: colors.mono400,
    borderRadius: getDecoratorBorderRadius($position, sizing.scale100),
  };
});

export const getInputContainerStyles = (props: SharedPropsT) => {
  const {
    $isFocused,
    $adjoined,
    $error,
    $disabled,
    $size,
    $theme: {colors, sizing, typography, animation},
  } = props;
  return {
    ...getFont($size, typography),
    color: $disabled ? colors.mono600 : colors.mono1000,
    boxSizing: 'border-box',
    display: 'flex',
    width: '100%',
    backgroundColor: $disabled
      ? colors.mono300
      : $isFocused
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
        : $isFocused
          ? colors.primary400
          : colors.mono200,
    borderRadius: getBorderRadius($adjoined, sizing.scale100),
    boxShadow: `0 2px 6px ${
      $disabled
        ? 'transparent'
        : $isFocused
          ? $error
            ? colors.shadowError
            : colors.shadowFocus
          : 'transparent'
    }`,
    transitionProperty: 'border, boxShadow, backgroundColor',
    transitionDuration: animation.timing100,
    transitionTimingFunction: animation.easeOutCurve,
  };
};

export const InputContainer = styled('div', getInputContainerStyles);

export const getInputStyles = (props: SharedPropsT) => {
  const {
    $disabled,
    $error,
    $size,
    $theme: {colors, sizing, typography},
  } = props;
  return {
    ...getFont($size, typography),
    color: $disabled ? colors.mono600 : colors.mono1000,
    caretColor: $error ? colors.negative400 : colors.primary,
    boxSizing: 'border-box',
    backgroundColor: 'transparent',
    borderWidth: '0',
    borderStyle: 'none',
    outline: 'none',
    ...getInputPadding($size, sizing),
    width: '100%',
    maxWidth: '100%',
    cursor: $disabled ? 'not-allowed' : 'text',
    '::placeholder': {
      color: $disabled ? colors.mono600 : colors.mono700,
    },
  };
};

export const Input = styled('input', getInputStyles);

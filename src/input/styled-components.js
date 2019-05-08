/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import {styled} from '../styles/index.js';
import {SIZE} from './constants.js';
import type {SharedPropsT} from './types.js';

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
    color: colors.foreground,
    display: 'flex',
    width: '100%',
  };
});

// InputEnhancer

function getInputEnhancerPadding($size, sizing) {
  return {
    [SIZE.default]: {
      padding: sizing.scale500,
    },
    [SIZE.compact]: {
      paddingTop: sizing.scale300,
      paddingRight: sizing.scale500,
      paddingBottom: sizing.scale300,
      paddingLeft: sizing.scale500,
    },
  }[$size];
}

function getInputEnhancerColors(colors) {
  return {
    color: colors.foreground,
    backgroundColor: colors.inputFillEnhancer,
  };
}

export const InputEnhancer = styled('div', props => {
  const {
    $size,
    $theme: {colors, sizing, typography},
  } = props;
  return {
    display: 'flex',
    ...getFont($size, typography),
    ...getInputEnhancerPadding($size, sizing),
    ...getInputEnhancerColors(colors),
  };
});

// InputContainer

function getInputContainerColors($disabled, $isFocused, $error, colors) {
  if ($disabled) {
    return {
      color: colors.inputTextDisabled,
      borderColor: colors.inputFillDisabled,
      backgroundColor: colors.inputFillDisabled,
    };
  }

  if ($isFocused) {
    return {
      color: colors.foreground,
      borderColor: colors.primary400,
      backgroundColor: colors.background,
    };
  }

  if ($error) {
    return {
      color: colors.foreground,
      borderColor: colors.negative400,
      backgroundColor: colors.inputFillError,
    };
  }

  return {
    color: colors.foreground,
    borderColor: colors.inputFill,
    backgroundColor: colors.inputFill,
  };
}

export const getInputContainerStyles = (props: SharedPropsT) => {
  const {
    $isFocused,
    $error,
    $disabled,
    $size,
    $theme: {colors, typography, animation},
  } = props;
  return {
    boxSizing: 'border-box',
    display: 'flex',
    width: '100%',
    borderWidth: '2px',
    borderStyle: 'solid',
    transitionProperty: 'border, boxShadow, backgroundColor',
    transitionDuration: animation.timing100,
    transitionTimingFunction: animation.easeOutCurve,
    ...getFont($size, typography),
    ...getInputContainerColors($disabled, $isFocused, $error, colors),
  };
};

export const InputContainer = styled('div', getInputContainerStyles);

// Input

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

function getInputColors($disabled, $error, colors) {
  if ($disabled) {
    return {
      color: colors.foregroundAlt,
      caretColor: colors.primary,
      '::placeholder': {
        color: colors.inputTextDisabled,
      },
    };
  }

  return {
    color: colors.foreground,
    caretColor: colors.primary,
    '::placeholder': {
      color: colors.foregroundAlt,
    },
  };
}

export const getInputStyles = (props: SharedPropsT) => {
  const {
    $disabled,
    $error,
    $size,
    $theme: {colors, sizing, typography},
  } = props;
  return {
    boxSizing: 'border-box',
    backgroundColor: 'transparent',
    borderWidth: '0',
    borderStyle: 'none',
    outline: 'none',
    width: '100%',
    maxWidth: '100%',
    cursor: $disabled ? 'not-allowed' : 'text',
    ...getFont($size, typography),
    ...getInputPadding($size, sizing),
    ...getInputColors($disabled, $error, colors),
  };
};

export const Input = styled('input', getInputStyles);

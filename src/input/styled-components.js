/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import {styled} from '../styles/index.js';
import type {ThemeT} from '../styles/types.js';
import {ADJOINED, SIZE} from './constants.js';
import type {SharedPropsT, SizeT} from './types.js';
import DeleteAlt from '../icon/delete-alt.js';

export const StyledMaskToggleButton = styled<{
  $size: SizeT,
  $isFocusVisible: boolean,
  $theme: ThemeT,
}>('button', ({$theme, $size, $isFocusVisible}) => {
  const pad = {
    [SIZE.mini]: $theme.sizing.scale400,
    [SIZE.compact]: $theme.sizing.scale400,
    [SIZE.default]: $theme.sizing.scale300,
    [SIZE.large]: $theme.sizing.scale200,
  }[$size];

  return {
    display: 'flex',
    alignItems: 'center',
    borderTopStyle: 'none',
    borderBottomStyle: 'none',
    borderLeftStyle: 'none',
    borderRightStyle: 'none',
    background: 'none',
    paddingLeft: pad,
    paddingRight: pad,
    outline: $isFocusVisible ? `solid 3px ${$theme.colors.accent}` : 'none',
    color: $theme.colors.contentPrimary,
  };
});

export const StyledClearIconContainer = styled<{
  $size: SizeT,
  $alignTop: boolean,
  $theme: ThemeT,
}>('div', ({$alignTop = false, $size, $theme}) => {
  const pad = {
    [SIZE.mini]: $theme.sizing.scale200,
    [SIZE.compact]: $theme.sizing.scale200,
    [SIZE.default]: $theme.sizing.scale100,
    [SIZE.large]: $theme.sizing.scale0,
  }[$size];

  return {
    display: 'flex',
    alignItems: $alignTop ? 'flex-start' : 'center',
    paddingLeft: pad,
    paddingRight: pad,
    paddingTop: $alignTop ? $theme.sizing.scale500 : '0px',
    color: $theme.colors.contentPrimary,
  };
});

export const StyledClearIcon = styled<
  typeof DeleteAlt,
  {$isFocusVisible: boolean},
>(DeleteAlt, ({$theme, $isFocusVisible}) => ({
  cursor: 'pointer',
  outline: $isFocusVisible ? `solid 3px ${$theme.colors.accent}` : 'none',
}));

function getInputPadding(size, sizing) {
  return {
    [SIZE.mini]: {
      paddingTop: sizing.scale100,
      paddingBottom: sizing.scale100,
      paddingLeft: sizing.scale550,
      paddingRight: sizing.scale550,
    },
    [SIZE.compact]: {
      paddingTop: sizing.scale200,
      paddingBottom: sizing.scale200,
      paddingLeft: sizing.scale550,
      paddingRight: sizing.scale550,
    },
    [SIZE.default]: {
      paddingTop: sizing.scale400,
      paddingBottom: sizing.scale400,
      paddingLeft: sizing.scale550,
      paddingRight: sizing.scale550,
    },
    [SIZE.large]: {
      paddingTop: sizing.scale550,
      paddingBottom: sizing.scale550,
      paddingLeft: sizing.scale550,
      paddingRight: sizing.scale550,
    },
  }[size];
}

function getRootPadding(adjoined, size, sizing, direction, hasIconTrailing) {
  let ifLeftPad =
    adjoined === ADJOINED.both ||
    (adjoined === ADJOINED.left && direction !== 'rtl') ||
    (adjoined === ADJOINED.right && direction === 'rtl') ||
    (hasIconTrailing && direction === 'rtl');
  let ifRightPad =
    adjoined === ADJOINED.both ||
    (adjoined === ADJOINED.right && direction !== 'rtl') ||
    (adjoined === ADJOINED.left && direction === 'rtl') ||
    (hasIconTrailing && direction !== 'rtl');
  return {
    paddingLeft: ifLeftPad ? sizing.scale550 : '0px',
    paddingRight: ifRightPad ? sizing.scale550 : '0px',
  };
}

function getFont(size, typography) {
  return {
    [SIZE.mini]: typography.font100,
    [SIZE.compact]: typography.font200,
    [SIZE.default]: typography.font300,
    [SIZE.large]: typography.font400,
  }[size];
}

function getRootColors($disabled, $isFocused, $error, $positive, colors) {
  if ($disabled) {
    return {
      borderLeftColor: colors.inputFillDisabled,
      borderRightColor: colors.inputFillDisabled,
      borderTopColor: colors.inputFillDisabled,
      borderBottomColor: colors.inputFillDisabled,
      backgroundColor: colors.inputFillDisabled,
    };
  }

  if ($isFocused) {
    return {
      borderLeftColor: colors.borderFocus,
      borderRightColor: colors.borderFocus,
      borderTopColor: colors.borderFocus,
      borderBottomColor: colors.borderFocus,
      backgroundColor: colors.inputFillActive,
    };
  }

  if ($error) {
    return {
      borderLeftColor: colors.inputBorderError,
      borderRightColor: colors.inputBorderError,
      borderTopColor: colors.inputBorderError,
      borderBottomColor: colors.inputBorderError,
      backgroundColor: colors.inputFillError,
    };
  }

  if ($positive) {
    return {
      borderLeftColor: colors.inputBorderPositive,
      borderRightColor: colors.inputBorderPositive,
      borderTopColor: colors.inputBorderPositive,
      borderBottomColor: colors.inputBorderPositive,
      backgroundColor: colors.inputFillPositive,
    };
  }

  return {
    borderLeftColor: colors.inputBorder,
    borderRightColor: colors.inputBorder,
    borderTopColor: colors.inputBorder,
    borderBottomColor: colors.inputBorder,
    backgroundColor: colors.inputFill,
  };
}

function getRootBorderRadius(radius) {
  return {
    borderTopLeftRadius: radius,
    borderBottomLeftRadius: radius,
    borderTopRightRadius: radius,
    borderBottomRightRadius: radius,
  };
}

export const getRootStyles = (props: {
  $adjoined: $Keys<typeof ADJOINED>,
  $isFocused: boolean,
  $error: boolean,
  $disabled: boolean,
  $positive: boolean,
  $size: SizeT,
  $theme: ThemeT,
  $hasIconTrailing: boolean,
}) => {
  const {
    $isFocused,
    $adjoined,
    $error,
    $disabled,
    $positive,
    $size,
    $theme,
    $theme: {borders, colors, sizing, typography, animation},
    $hasIconTrailing,
  } = props;
  return {
    boxSizing: 'border-box',
    display: 'flex',
    overflow: 'hidden',
    width: '100%',
    borderLeftWidth: '2px',
    borderRightWidth: '2px',
    borderTopWidth: '2px',
    borderBottomWidth: '2px',
    borderLeftStyle: 'solid',
    borderRightStyle: 'solid',
    borderTopStyle: 'solid',
    borderBottomStyle: 'solid',
    transitionProperty: 'border',
    transitionDuration: animation.timing200,
    transitionTimingFunction: animation.easeOutCurve,
    ...getRootBorderRadius(borders.inputBorderRadius),
    ...getFont($size, typography),
    ...getRootColors($disabled, $isFocused, $error, $positive, colors),
    ...getRootPadding(
      $adjoined,
      $size,
      sizing,
      $theme.direction,
      $hasIconTrailing,
    ),
  };
};

export const Root = styled<SharedPropsT>('div', getRootStyles);

// InputEnhancer

type InputEnhancerStyles = {|
  paddingRight: string,
  paddingLeft: string,
|};
function getInputEnhancerPadding($size, sizing): InputEnhancerStyles {
  return {
    [SIZE.mini]: {
      paddingRight: sizing.scale400,
      paddingLeft: sizing.scale400,
    },
    [SIZE.compact]: {
      paddingRight: sizing.scale400,
      paddingLeft: sizing.scale400,
    },
    [SIZE.default]: {
      paddingRight: sizing.scale300,
      paddingLeft: sizing.scale300,
    },
    [SIZE.large]: {
      paddingRight: sizing.scale200,
      paddingLeft: sizing.scale200,
    },
  }[$size];
}

function getInputEnhancerColors(
  $disabled,
  $isFocused,
  $error,
  $positive,
  colors,
) {
  if ($disabled) {
    return {
      color: colors.inputEnhancerTextDisabled,
      backgroundColor: colors.inputFillDisabled,
    };
  }

  if ($isFocused) {
    return {
      color: colors.contentPrimary,
      backgroundColor: colors.inputFillActive,
    };
  }

  if ($error) {
    return {
      color: colors.contentPrimary,
      backgroundColor: colors.inputFillError,
    };
  }

  if ($positive) {
    return {
      color: colors.contentPrimary,
      backgroundColor: colors.inputFillPositive,
    };
  }

  return {
    color: colors.contentPrimary,
    backgroundColor: colors.inputFill,
  };
}

export const InputEnhancer = styled<SharedPropsT>('div', (props) => {
  const {
    $size,
    $disabled,
    $isFocused,
    $error,
    $positive,
    $theme: {colors, sizing, typography, animation},
  } = props;
  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transitionProperty: 'color, background-color',
    transitionDuration: animation.timing200,
    transitionTimingFunction: animation.easeOutCurve,
    ...getFont($size, typography),
    ...getInputEnhancerPadding($size, sizing),
    ...getInputEnhancerColors($disabled, $isFocused, $error, $positive, colors),
  };
});

// InputContainer

function getInputContainerColors(
  $disabled,
  $isFocused,
  $error,
  $positive,
  colors,
) {
  if ($disabled) {
    return {
      color: colors.inputTextDisabled,
      backgroundColor: colors.inputFillDisabled,
    };
  }

  if ($isFocused) {
    return {
      color: colors.contentPrimary,
      backgroundColor: colors.inputFillActive,
    };
  }

  if ($error) {
    return {
      color: colors.contentPrimary,
      backgroundColor: colors.inputFillError,
    };
  }

  if ($positive) {
    return {
      color: colors.contentPrimary,
      backgroundColor: colors.inputFillPositive,
    };
  }

  return {
    color: colors.contentPrimary,
    backgroundColor: colors.inputFill,
  };
}

export const getInputContainerStyles = (props: {
  $isFocused: boolean,
  $error: boolean,
  $disabled: boolean,
  $positive: boolean,
  $size: SizeT,
  $theme: ThemeT,
}) => {
  const {
    $isFocused,
    $error,
    $disabled,
    $positive,
    $size,
    $theme: {colors, typography, animation},
  } = props;
  return {
    display: 'flex',
    width: '100%',
    transitionProperty: 'background-color',
    transitionDuration: animation.timing200,
    transitionTimingFunction: animation.easeOutCurve,
    ...getFont($size, typography),
    ...getInputContainerColors(
      $disabled,
      $isFocused,
      $error,
      $positive,
      colors,
    ),
  };
};

export const InputContainer = styled<SharedPropsT>(
  'div',
  getInputContainerStyles,
);

function getInputColors($disabled, $isFocused, $error, colors) {
  if ($disabled) {
    return ({
      color: colors.inputTextDisabled,
      '-webkit-text-fill-color': colors.inputTextDisabled,
      caretColor: colors.contentPrimary,
      '::placeholder': {
        color: colors.inputPlaceholderDisabled,
      },
    }: {});
  }

  return {
    color: colors.contentPrimary,
    caretColor: colors.contentPrimary,
    '::placeholder': {
      color: colors.inputPlaceholder,
    },
  };
}

export const getInputStyles = (props: SharedPropsT & {$theme: ThemeT}) => {
  const {
    $disabled,
    $isFocused,
    $error,
    $size,
    $theme: {colors, sizing, typography},
  } = props;
  return {
    boxSizing: 'border-box',
    backgroundColor: 'transparent',
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderLeftStyle: 'none',
    borderRightStyle: 'none',
    borderTopStyle: 'none',
    borderBottomStyle: 'none',
    outline: 'none',
    width: '100%',
    // See https://stackoverflow.com/a/33811151
    minWidth: 0,
    maxWidth: '100%',
    cursor: $disabled ? 'not-allowed' : 'text',
    margin: '0',
    paddingTop: '0',
    paddingBottom: '0',
    paddingLeft: '0',
    paddingRight: '0',
    ...getFont($size, typography),
    ...getInputPadding($size, sizing),
    ...getInputColors($disabled, $isFocused, $error, colors),
  };
};

export const Input = styled<SharedPropsT>('input', getInputStyles);

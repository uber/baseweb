/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import {styled} from '../styles/index.js';
import type {ThemeT} from '../styles/types.js';
import {ADJOINED, ENHANCER_POSITION, SIZE} from './constants.js';
import type {SharedPropsT, SizeT} from './types.js';
import DeleteAlt from '../icon/delete-alt.js';

export const StyledMaskToggleButton = styled<{
  $size: SizeT,
  $isFocusVisible: boolean,
  $theme: ThemeT,
}>('button', ({$theme, $size, $isFocusVisible}) => {
  const pad = {
    [SIZE.mini]: $theme.sizing.scale300,
    [SIZE.compact]: $theme.sizing.scale400,
    [SIZE.default]: $theme.sizing.scale500,
    [SIZE.large]: $theme.sizing.scale600,
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
  $alignTop: boolean,
  $theme: ThemeT,
}>('div', ({$alignTop = false, $theme}) => {
  const paddingDir: string =
    $theme.direction === 'rtl' ? 'paddingLeft' : 'paddingRight';
  return {
    display: 'flex',
    alignItems: $alignTop ? 'flex-start' : 'center',
    [paddingDir]: $theme.sizing.scale500,
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
      paddingLeft: sizing.scale200,
      paddingRight: sizing.scale200,
    },
    [SIZE.compact]: {
      paddingTop: sizing.scale200,
      paddingBottom: sizing.scale200,
      paddingLeft: sizing.scale400,
      paddingRight: sizing.scale400,
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
      paddingLeft: sizing.scale650,
      paddingRight: sizing.scale650,
    },
  }[size];
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
    };
  }

  if ($isFocused) {
    return {
      borderLeftColor: colors.borderFocus,
      borderRightColor: colors.borderFocus,
      borderTopColor: colors.borderFocus,
      borderBottomColor: colors.borderFocus,
    };
  }

  if ($error) {
    return {
      borderLeftColor: colors.inputBorderError,
      borderRightColor: colors.inputBorderError,
      borderTopColor: colors.inputBorderError,
      borderBottomColor: colors.inputBorderError,
    };
  }

  if ($positive) {
    return {
      borderLeftColor: colors.inputBorderPositive,
      borderRightColor: colors.inputBorderPositive,
      borderTopColor: colors.inputBorderPositive,
      borderBottomColor: colors.inputBorderPositive,
    };
  }

  return {
    borderLeftColor: colors.inputBorder,
    borderRightColor: colors.inputBorder,
    borderTopColor: colors.inputBorder,
    borderBottomColor: colors.inputBorder,
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
}) => {
  const {
    $isFocused,
    $error,
    $disabled,
    $positive,
    $size,
    $theme: {borders, colors, typography, animation},
  } = props;
  return {
    boxSizing: 'border-box',
    display: 'flex',
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
  };
};

export const Root = styled<SharedPropsT>('div', getRootStyles);

// InputEnhancer

function getInputEnhancerBorderRadius(position, radius) {
  return {
    [ENHANCER_POSITION.start]: {
      borderTopLeftRadius: radius,
      borderBottomLeftRadius: radius,
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
    },
    [ENHANCER_POSITION.end]: {
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
      borderTopRightRadius: radius,
      borderBottomRightRadius: radius,
    },
  }[position];
}

type InputEnhancerStyles = {|
  paddingRight: string,
  paddingLeft: string,
|};
function getInputEnhancerPadding($size, sizing, position): InputEnhancerStyles {
  return {
    [SIZE.mini]: {
      paddingRight:
        position === ENHANCER_POSITION.start
          ? sizing.scale100
          : sizing.scale200,
      paddingLeft:
        position === ENHANCER_POSITION.start
          ? sizing.scale400
          : sizing.scale200,
    },
    [SIZE.compact]: {
      paddingRight:
        position === ENHANCER_POSITION.start
          ? sizing.scale200
          : sizing.scale400,
      paddingLeft:
        position === ENHANCER_POSITION.start
          ? sizing.scale600
          : sizing.scale400,
    },
    [SIZE.default]: {
      paddingRight:
        position === ENHANCER_POSITION.start
          ? sizing.scale400
          : sizing.scale600,

      paddingLeft:
        position === ENHANCER_POSITION.start
          ? sizing.scale800
          : sizing.scale600,
    },
    [SIZE.large]: {
      paddingRight:
        position === ENHANCER_POSITION.start
          ? sizing.scale550
          : sizing.scale650,
      paddingLeft:
        position === ENHANCER_POSITION.start
          ? sizing.scale900
          : sizing.scale650,
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
      backgroundColor: colors.inputEnhancerFillDisabled,
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

export const InputEnhancer = styled<SharedPropsT>('div', props => {
  const {
    $position,
    $size,
    $disabled,
    $isFocused,
    $error,
    $positive,
    $theme: {borders, colors, sizing, typography, animation},
  } = props;
  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transitionProperty: 'color, background-color',
    transitionDuration: animation.timing200,
    transitionTimingFunction: animation.easeOutCurve,
    ...getInputEnhancerBorderRadius($position, borders.inputBorderRadius),
    ...getFont($size, typography),
    ...getInputEnhancerPadding($size, sizing, $position),
    ...getInputEnhancerColors($disabled, $isFocused, $error, $positive, colors),
  };
});

// InputContainer

function getInputContainerBorderRadius(adjoined, radius) {
  return {
    [ADJOINED.none]: {
      borderTopLeftRadius: radius,
      borderBottomLeftRadius: radius,
      borderTopRightRadius: radius,
      borderBottomRightRadius: radius,
    },
    [ADJOINED.left]: {
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
      borderTopRightRadius: radius,
      borderBottomRightRadius: radius,
    },
    [ADJOINED.right]: {
      borderTopLeftRadius: radius,
      borderBottomLeftRadius: radius,
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
    },
    [ADJOINED.both]: {
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
    },
  }[adjoined];
}

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
  $adjoined: $Keys<typeof ADJOINED>,
  $isFocused: boolean,
  $error: boolean,
  $disabled: boolean,
  $positive: boolean,
  $size: SizeT,
  $theme: ThemeT,
}) => {
  const {
    $isFocused,
    $adjoined,
    $error,
    $disabled,
    $positive,
    $size,
    $theme: {borders, colors, typography, animation},
  } = props;
  return {
    display: 'flex',
    width: '100%',
    transitionProperty: 'background-color',
    transitionDuration: animation.timing200,
    transitionTimingFunction: animation.easeOutCurve,
    ...getInputContainerBorderRadius($adjoined, borders.inputBorderRadius),
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
    return {
      color: colors.contentSecondary,
      caretColor: colors.contentPrimary,
      '::placeholder': {
        color: colors.inputPlaceholderDisabled,
      },
    };
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

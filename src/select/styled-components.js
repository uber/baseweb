/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import {styled} from '../styles/index.js';
import {TYPE} from './constants.js';
import {StyledList, StyledListItem} from '../menu/index.js';
import {SIZE} from './constants.js';
import type {SharedStylePropsArgT} from './types.js';
import {ellipsisText} from '../styles/util.js';
import type {ThemeT} from '../styles/types.js';

function getFont(size = SIZE.default, typography) {
  return {
    [SIZE.mini]: typography.font100,
    [SIZE.compact]: typography.font200,
    [SIZE.default]: typography.font300,
    [SIZE.large]: typography.font400,
  }[size];
}

function getControlPadding(props) {
  const {
    $theme,
    $theme: {sizing},
    $size = SIZE.default,
    $type,
    $multi,
    $isEmpty,
  } = props;
  const isSearch = $type === TYPE.search;
  const paddingLeft = isSearch
    ? `calc(${sizing.scale1000} - ${sizing.scale0})`
    : sizing.scale400;

  const paddingStartDir: string =
    $theme.direction === 'rtl' ? 'paddingRight' : 'paddingLeft';
  const paddingEndDir: string =
    $theme.direction === 'rtl' ? 'paddingLeft' : 'paddingRight';

  return {
    [SIZE.mini]: {
      // `sizing.scale0` based on the multi value component (Tag) top and bottom margin
      paddingTop: $multi && !$isEmpty ? 0 : sizing.scale100,
      paddingBottom: $multi && !$isEmpty ? 0 : sizing.scale100,
      [paddingStartDir]:
        $multi && !$isEmpty
          ? `calc(${paddingLeft} - ${sizing.scale0})`
          : paddingLeft,
      [paddingEndDir]: '0',
    },
    [SIZE.compact]: {
      // `sizing.scale0` based on the multi value component (Tag) top and bottom margin
      paddingTop:
        $multi && !$isEmpty
          ? `calc(${sizing.scale100} - ${sizing.scale0})`
          : sizing.scale200,
      paddingBottom:
        $multi && !$isEmpty
          ? `calc(${sizing.scale100} - ${sizing.scale0})`
          : sizing.scale200,
      [paddingStartDir]:
        $multi && !$isEmpty
          ? `calc(${paddingLeft} - ${sizing.scale0})`
          : paddingLeft,
      [paddingEndDir]: '0',
    },
    [SIZE.default]: {
      // `sizing.scale0` based on the multi value component (Tag) top and bottom margin
      paddingTop:
        $multi && !$isEmpty
          ? `calc(${sizing.scale400} - ${sizing.scale0})`
          : sizing.scale400,
      paddingBottom:
        $multi && !$isEmpty
          ? `calc(${sizing.scale400} - ${sizing.scale0})`
          : sizing.scale400,
      [paddingStartDir]:
        $multi && !$isEmpty
          ? `calc(${paddingLeft} + ${sizing.scale0})`
          : paddingLeft,
      [paddingEndDir]: 0,
    },
    [SIZE.large]: {
      // `sizing.scale0` based on the multi value component (Tag) top and bottom margin
      paddingTop:
        $multi && !$isEmpty
          ? `calc(${sizing.scale600} - ${sizing.scale0})`
          : sizing.scale550,
      paddingBottom:
        $multi && !$isEmpty
          ? `calc(${sizing.scale600} - ${sizing.scale0})`
          : sizing.scale550,
      [paddingStartDir]:
        $multi && !$isEmpty
          ? `calc(${paddingLeft} - ${sizing.scale0})`
          : paddingLeft,
      [paddingEndDir]: 0,
    },
  }[$size];
}

export const StyledDropdownContainer = styled<SharedStylePropsArgT>(
  'div',
  props => {
    return {
      width: `${String(props.$width)}px`,
    };
  },
);

export const StyledDropdown = StyledList;

export const StyledDropdownListItem = StyledListItem;

export const StyledOptionContent = styled<SharedStylePropsArgT>(
  'div',
  props => {
    const {$isHighlighted, $selected, $disabled, $theme} = props;

    return ({
      cursor: $disabled ? 'not-allowed' : 'pointer',
      color:
        $selected && !$isHighlighted ? $theme.colors.menuFontSelected : null,
      fontWeight: $selected ? 'bold' : 'normal',
    }: {});
  },
);

export const StyledRoot = styled<SharedStylePropsArgT>('div', props => {
  const {
    $theme: {typography},
    $size,
  } = props;
  return {
    ...getFont($size, typography),
    boxSizing: 'border-box',
    position: 'relative',
    width: '100%',
  };
});

function getControlContainerColors(
  $disabled,
  $isFocused,
  $isPseudoFocused,
  $positive,
  $error,
  colors,
) {
  if ($disabled) {
    return {
      color: colors.inputTextDisabled,
      borderColor: colors.inputFillDisabled,
      backgroundColor: colors.inputFillDisabled,
    };
  }

  if ($isFocused || $isPseudoFocused) {
    return {
      color: colors.contentPrimary,
      borderColor: colors.borderFocus,
      backgroundColor: colors.inputFillActive,
    };
  }

  if ($error) {
    return {
      color: colors.contentPrimary,
      borderColor: colors.inputBorderError,
      backgroundColor: colors.inputFillError,
    };
  }

  if ($positive) {
    return {
      color: colors.contentPrimary,
      borderColor: colors.inputBorderPositive,
      backgroundColor: colors.inputFillPositive,
    };
  }

  return {
    color: colors.contentPrimary,
    borderColor: colors.inputBorder,
    backgroundColor: colors.inputFill,
  };
}

export const StyledControlContainer = styled<SharedStylePropsArgT>(
  'div',
  props => {
    const {
      $disabled,
      $error,
      $positive,
      $isFocused,
      $isPseudoFocused,
      $type,
      $searchable,
      $theme: {borders, colors, animation},
    } = props;
    return {
      borderTopLeftRadius: borders.inputBorderRadius,
      borderTopRightRadius: borders.inputBorderRadius,
      borderBottomRightRadius: borders.inputBorderRadius,
      borderBottomLeftRadius: borders.inputBorderRadius,
      boxSizing: 'border-box',
      overflow: 'hidden',
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      cursor: $disabled
        ? 'not-allowed'
        : $searchable || $type === TYPE.search
        ? 'text'
        : 'pointer',
      borderWidth: '2px',
      borderStyle: 'solid',
      transitionProperty: 'border, box-shadow, background-color',
      transitionDuration: animation.timing100,
      transitionTimingFunction: animation.easeOutCurve,
      ...getControlContainerColors(
        $disabled,
        $isFocused,
        $isPseudoFocused,
        $positive,
        $error,
        colors,
      ),
    };
  },
);

export const StyledValueContainer = styled<SharedStylePropsArgT>(
  'div',
  props => {
    const padding = getControlPadding(props);
    return {
      boxSizing: 'border-box',
      position: 'relative',
      flexGrow: 1,
      flexShrink: 1,
      flexBasis: '0%',
      display: 'flex',
      alignItems: 'center',
      flexWrap: props.$multi ? 'wrap' : 'nowrap',
      overflow: 'hidden',
      ...padding,
    };
  },
);

export const StyledPlaceholder = styled<SharedStylePropsArgT>('div', props => {
  const {
    $disabled,
    $theme: {colors},
  } = props;
  return {
    color: $disabled
      ? colors.inputPlaceholderDisabled
      : colors.inputPlaceholder,
    maxWidth: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  };
});

export const StyledSingleValue = styled<SharedStylePropsArgT>('div', props => {
  const {
    $searchable,
    $size,
    $theme,
    $theme: {typography},
  } = props;
  const font = getFont($size, typography);
  const marginDir: string =
    $theme.direction === 'rtl' ? 'marginRight' : 'marginLeft';
  return {
    lineHeight: !$searchable ? font.lineHeight : 'inherit',
    boxSizing: 'border-box',
    [marginDir]: $theme.sizing.scale0,
    height: '100%',
    maxWidth: '100%',
    ...ellipsisText,
  };
});

export const StyledInputContainer = styled<SharedStylePropsArgT>(
  'div',
  props => {
    const {
      $size,
      $searchable,
      $theme: {typography, sizing},
      $isEmpty,
    } = props;
    const font = getFont($size, typography);
    return {
      position: 'relative',
      display: 'inline-block',
      maxWidth: '100%',
      backgroundColor: 'transparent',
      border: 'none',
      boxShadow: 'none',
      boxSizing: 'border-box',
      outline: 'none',
      marginTop: 0,
      marginBottom: 0,
      marginLeft: $isEmpty ? 0 : sizing.scale0,
      marginRight: 0,
      paddingTop: 0,
      paddingBottom: 0,
      paddingLeft: 0,
      paddingRight: 0,
      height: String(!$searchable ? font.lineHeight : 'auto'),
      maxHeight: String(font.lineHeight),
    };
  },
);

export const StyledInput = styled<SharedStylePropsArgT>('input', props => {
  const {
    $theme: {typography},
    $size,
    $searchable,
    $width,
  } = props;
  return {
    ...getFont($size, typography),
    boxSizing: 'content-box',
    width: !$searchable ? '1px' : $width || '100%',
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

export const StyledInputSizer = styled<SharedStylePropsArgT>(
  'div',
  ({$size, $theme, $theme: {typography}}) => {
    const dir: string = $theme.direction === 'rtl' ? 'right' : 'left';
    return {
      ...getFont($size, typography),
      position: 'absolute',
      top: 0,
      [dir]: 0,
      visibility: 'hidden',
      height: 0,
      overflow: 'scroll',
      whiteSpace: 'pre',
    };
  },
);

export const StyledIconsContainer = styled<SharedStylePropsArgT>(
  'div',
  ({$theme, $theme: {sizing}}) => {
    const paddingDir: string =
      $theme.direction === 'rtl' ? 'paddingLeft' : 'paddingRight';
    return {
      boxSizing: 'border-box',
      position: 'relative',
      display: 'flex',
      flexShrink: 0,
      alignItems: 'center',
      alignSelf: 'stretch',
      [paddingDir]: sizing.scale500,
    };
  },
);

function getSvgStyles({$theme}) {
  return {
    display: 'inline-block',
    fill: 'currentColor',
    color: 'currentColor',
    height: $theme.sizing.scale600,
    width: $theme.sizing.scale600,
  };
}

export const StyledSelectArrow = styled<SharedStylePropsArgT>('svg', props => {
  const {$theme, $disabled} = props;
  const {colors} = $theme;
  return {
    ...getSvgStyles({$theme}),
    color: $disabled ? colors.inputTextDisabled : colors.contentPrimary,
    cursor: $disabled ? 'not-allowed' : 'pointer',
  };
});

export const StyledClearIcon = styled<SharedStylePropsArgT>('svg', props => {
  const {$theme} = props;
  const {colors} = $theme;
  return {
    ...getSvgStyles({$theme}),
    color: colors.contentPrimary,
    cursor: 'pointer',
  };
});

export const getLoadingIconStyles = (props: {$theme: ThemeT}) => {
  const {$theme} = props;
  const {colors} = $theme;
  return {
    ...getSvgStyles({$theme}),
    color: colors.contentPrimary,
  };
};

export const StyledSearchIconContainer = styled<SharedStylePropsArgT>(
  'div',
  props => {
    const {$disabled, $theme} = props;
    const {colors, sizing} = $theme;
    const dir: string = $theme.direction === 'rtl' ? 'right' : 'left';
    return {
      ...getSvgStyles(props),
      color: $disabled ? colors.inputTextDisabled : colors.contentPrimary,
      cursor: $disabled ? 'not-allowed' : 'pointer',
      position: 'absolute',
      top: 0,
      [dir]: sizing.scale500,
      display: 'flex',
      alignItems: 'center',
      height: '100%',
    };
  },
);

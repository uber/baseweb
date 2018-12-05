/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import {styled} from '../styles/index.js';
import {TYPE} from './constants.js';
import {getSvgStyles} from '../icon/styled-components.js';
import {SIZE} from './constants.js';
import type {SharedStylePropsT} from './types.js';
import {ellipsisText} from '../styles/util.js';

function getFont(size = SIZE.default, typography) {
  return {
    [SIZE.default]: typography.font300,
    [SIZE.compact]: typography.font200,
  }[size];
}

function getControlPadding(props, emptyValue) {
  const {
    $theme: {sizing},
    $size = SIZE.default,
    $type,
    $multi,
  } = props;
  const isSearch = $type === TYPE.search;
  const paddingLeft = isSearch ? sizing.scale1000 : sizing.scale500;
  return {
    [SIZE.default]: {
      // `sizing.scale0` based on the multi value component (Tag) top and bottom margin
      paddingTop:
        $multi && !emptyValue
          ? `calc(${sizing.scale400} - ${sizing.scale0})`
          : sizing.scale400,
      paddingBottom:
        $multi && !emptyValue
          ? `calc(${sizing.scale400} - ${sizing.scale0})`
          : sizing.scale400,
      paddingLeft,
      paddingRight: '0',
    },
    [SIZE.compact]: {
      // `sizing.scale0` based on the multi value component (Tag) top and bottom margin
      paddingTop:
        $multi && !emptyValue
          ? `calc(${sizing.scale200} - ${sizing.scale0})`
          : sizing.scale200,
      paddingBottom:
        $multi && !emptyValue
          ? `calc(${sizing.scale200} - ${sizing.scale0})`
          : sizing.scale200,
      paddingLeft:
        $multi && !emptyValue
          ? `calc(${paddingLeft} - ${sizing.scale0})`
          : paddingLeft,
      paddingRight: '0',
    },
  }[$size];
}

export const StyledDropdownContainer = styled('div', props => {
  const {
    $theme: {sizing},
  } = props;
  return {
    boxSizing: 'border-box',
    position: 'absolute',
    width: '100%',
    zIndex: 1,
    marginTop: sizing.scale300,
    paddingTop: '0',
    paddingBottom: '0',
    paddingLeft: sizing.scale300,
    paddingRight: sizing.scale300,
  };
});
StyledDropdownContainer.displayName = 'StyledDropdownContainer';

export const StyledOptionContent = styled('div', props => {
  const {$isHighlighted, $selected, $disabled, $theme} = props;
  const {
    colors: {foregroundAlt, primary400, foreground},
  } = $theme;
  return {
    cursor: $disabled ? 'not-allowed' : 'pointer',
    color: $disabled
      ? foregroundAlt
      : $selected || $isHighlighted
        ? primary400
        : foreground,
    fontWeight: $selected ? 'bold' : 'normal',
  };
});
StyledOptionContent.displayName = 'StyledOptionContent';

export const StyledRoot = styled('div', (props: SharedStylePropsT) => {
  const {
    $theme: {typography},
    $size,
  } = props;
  return {
    ...getFont($size, typography),
    boxSizing: 'border-box',
    position: 'relative',
  };
});
StyledRoot.displayName = 'StyledRoot';

export const StyledControlContainer = styled(
  'div',
  (props: SharedStylePropsT) => {
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
      boxSizing: 'border-box',
      overflow: 'hidden',
      width: '100%',
      color: $disabled ? colors.inputTextDisabled : colors.foreground,
      display: 'flex',
      justifyContent: 'space-between',
      cursor: $disabled
        ? 'not-allowed'
        : $searchable || $type === TYPE.search
          ? 'text'
          : 'pointer',
      backgroundColor: $disabled
        ? colors.inputFillDisabled
        : $isFocused || $isPseudoFocused
          ? colors.background
          : $error
            ? colors.negative50
            : colors.inputFill,
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: $disabled
        ? colors.inputFillDisabled
        : $error
          ? colors.negative400
          : $isFocused || $isPseudoFocused
            ? colors.primary400
            : colors.inputFill,
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
  },
);
StyledControlContainer.displayName = 'StyledControlContainer';

export const StyledValueContainer = styled(
  'span',
  (props: SharedStylePropsT) => {
    const padding = getControlPadding(props);
    return {
      boxSizing: 'border-box',
      position: 'relative',
      flexGrow: 1,
      flexShrink: 1,
      flexBasis: '0%',
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
      overflow: 'hidden',
      ...padding,
    };
  },
);
StyledValueContainer.displayName = 'StyledValueContainer';

export const StyledPlaceholder = styled('div', (props: SharedStylePropsT) => {
  const {
    $disabled,
    $theme: {colors},
  } = props;
  return {
    position: 'absolute',
    top: '0',
    bottom: '0',
    right: '0',
    left: '0',
    color: $disabled ? colors.inputTextDisabled : colors.foregroundAlt,
    maxWidth: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    ...getControlPadding(props, true),
  };
});
StyledPlaceholder.displayName = 'StyledPlaceholder';

export const StyledSingleValue = styled('div', (props: SharedStylePropsT) => {
  const {
    $searchable,
    $size,
    $theme: {typography},
  } = props;
  const font = getFont($size, typography);
  return {
    lineHeight: !$searchable ? font.lineHeight : 'inherit',
    boxSizing: 'border-box',
    position: 'absolute',
    top: '0',
    left: '0',
    height: '100%',
    maxWidth: '100%',
    ...ellipsisText,
    ...getControlPadding(props),
  };
});
StyledSingleValue.displayName = 'StyledSingleValue';

export const StyledInputContainer = styled('div', props => {
  const {
    $multi,
    $size,
    $searchable,
    $theme: {typography, sizing},
  } = props;
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
    // sizing.scale0 to match the multi value component (Tag) top and bottom margin
    paddingTop: $multi ? sizing.scale0 : '0',
    paddingBottom: $multi ? sizing.scale0 : '0',
    paddingLeft: '0',
    paddingRight: '0',
    height: !$searchable ? font.lineHeight : 'auto',
  };
});
StyledInputContainer.displayName = 'StyledInputContainer';

export const StyledInput = styled(
  'input',
  (props: SharedStylePropsT & {$width: string}) => {
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
      width: $disabled || !$searchable ? '1px' : $width || '100%',
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
  },
);
StyledInput.displayName = 'StyledInput';

export const StyledInputSizer = styled('div', {
  position: 'absolute',
  top: 0,
  left: 0,
  visibility: 'hidden',
  height: 0,
  overflow: 'scroll',
  whiteSpace: 'pre',
});
StyledInputSizer.displayName = 'StyledInputSizer';

export const StyledIconsContainer = styled('div', ({$theme: {sizing}}) => {
  return {
    boxSizing: 'border-box',
    position: 'relative',
    display: 'flex',
    flexShrink: 0,
    alignItems: 'center',
    alignSelf: 'stretch',
    paddingRight: sizing.scale500,
  };
});
StyledIconsContainer.displayName = 'StyledIconsContainer';

export const StyledSelectArrow = styled('svg', (props: SharedStylePropsT) => {
  const {$theme, $disabled} = props;
  const {colors} = $theme;
  return {
    ...getSvgStyles({$theme}),
    color: $disabled ? colors.inputTextDisabled : colors.foregroundAlt,
    cursor: $disabled ? 'not-allowed' : 'pointer',
  };
});
StyledSelectArrow.displayName = 'StyledSelectArrow';

export const StyledClearIcon = styled('svg', (props: SharedStylePropsT) => {
  const {$theme} = props;
  const {colors} = $theme;
  return {
    ...getSvgStyles({$theme}),
    color: colors.foregroundAlt,
    cursor: 'pointer',
  };
});
StyledClearIcon.displayName = 'StyledClearIcon';

export const getLoadingIconStyles = (props: SharedStylePropsT) => {
  const {$theme} = props;
  const {colors} = $theme;
  return {
    ...getSvgStyles({$theme}),
    color: colors.foregroundAlt,
  };
};

export const StyledSearchIcon = styled('svg', (props: SharedStylePropsT) => {
  const {$disabled, $theme} = props;
  const {colors, sizing} = $theme;
  return {
    ...getSvgStyles({$theme}),
    color: $disabled ? colors.inputTextDisabled : colors.foregroundAlt,
    cursor: $disabled ? 'not-allowed' : 'pointer',
    position: 'absolute',
    left: sizing.scale500,
    display: 'inline-block',
    height: '100%',
    zIndex: 1,
  };
});
StyledSearchIcon.displayName = 'StyledSearchIcon';

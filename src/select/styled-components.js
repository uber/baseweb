/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import {styled} from '../styles/index';
import {ICON, TYPE} from './constants';
import {getSvgStyles} from '../icon/styled-components';
import {SIZE} from '../input';
import {
  getInputStyles,
  getInputContainerStyles,
} from '../input/styled-components';

import {
  List as MenuList,
  ListItem as MenuListItem,
} from '../menu/styled-components';

function getFont(size = SIZE.default, typography) {
  return {
    [SIZE.default]: typography.font300,
    [SIZE.compact]: typography.font200,
  }[size];
}

function getControlPadding(size = SIZE.default, sizing) {
  return {
    [SIZE.default]: {
      paddingTop: sizing.scale400,
      paddingBottom: sizing.scale400,
      paddingLeft: sizing.scale500,
      paddingRight: sizing.scale500,
    },
    [SIZE.compact]: {
      paddingTop: sizing.scale200,
      paddingBottom: sizing.scale200,
      paddingLeft: sizing.scale500,
      paddingRight: sizing.scale500,
    },
  }[size];
}

export const Root = styled('div', props => {
  return {
    position: 'relative',
  };
});

export const Input = styled('input', props => {
  const {$theme} = props;
  const {
    sizing: {scale300},
  } = $theme;
  return {
    ...getInputStyles({...props, $size: SIZE.default}),
    cursor: 'pointer',
    width: 'auto',
    flexGrow: '1',
    paddingTop: scale300,
    paddingBottom: scale300,
  };
});

export const InputContainer = styled('div', props => {
  const {$theme, $isFocused, $error} = props;
  const {
    colors: {primary400, mono200, negative50},
    sizing: {scale300},
  } = $theme;

  const border = {
    borderColor: mono200,
  };

  if ($isFocused) {
    border.borderColor = primary400;
  } else if ($error) {
    border.borderColor = negative50;
  }

  return {
    ...getInputContainerStyles({...props, $size: SIZE.default}),
    flexWrap: 'wrap',
    paddingLeft: scale300,
    paddingRight: scale300,
    paddingTop: '0',
    paddingBottom: '0',
    alignItems: 'center',
    position: 'relative',
    ...border,
  };
});

export const SingleSelection = styled('span', props => {
  const {$theme, $disabled} = props;
  const {
    colors: {mono1000},
  } = $theme;
  return {
    ...getInputStyles({...props, $size: SIZE.default, $disabled: true}),
    cursor: $disabled ? 'not-allowed' : 'pointer',
    width: 'auto',
    flexGrow: '1',
    color: mono1000,
  };
});

export const SelectComponentIcon = styled('img', props => {
  const {$theme, $disabled} = props;
  const {
    sizing: {scale300, scale500},
  } = $theme;
  switch (props.$type) {
    case ICON.clearAll:
      return {
        marginLeft: 'auto',
        cursor: $disabled ? 'not-allowed' : 'pointer',
      };
    case ICON.select:
      return {
        marginRight: scale500,
      };
    case ICON.selected:
      return {
        paddingRight: scale300,
      };
    case ICON.loop:
      return {
        paddingLeft: scale300,
      };
    default:
      return {};
  }
});

export const DropDown = styled(MenuList, ({$theme, $isOpen, $type}) => ({
  overflowY: 'scroll',
  display: !$isOpen ? 'none' : null,
  top: $type === TYPE.select ? $theme.sizing.scale600 : $theme.sizing.scale1200,
  width: `calc(100% - ${$theme.sizing.scale600})`,
  left: $theme.sizing.scale300,
  position: 'absolute',
  listStyle: 'none',
  borderRadius: $theme.sizing.scale300,
  boxShadow: $theme.lighting.shadow600,
}));

export const DropDownItem = styled(MenuListItem, ({$theme}) => ({
  // TODO(#185): revisit after Menu gets condensed styles
  lineHeight: $theme.sizing.scale600,
}));

export const Option = styled('div', props => {
  const {$selected, $disabled, $theme} = props;
  const {
    colors: {mono700, primary400},
  } = $theme;
  const padding = $selected
    ? {
        paddingRight: '0px',
        paddingLeft: '0px',
      }
    : {
        paddingRight: '18px',
        paddingLeft: '18px',
      };
  return {
    ':hover': {
      cursor: $disabled ? 'not-allowed' : 'pointer',
    },
    color: $disabled ? mono700 : $selected ? primary400 : null,
    ...padding,
  };
});

export const SelectSpinner = styled('div', () => {
  return {
    paddingLeft: '50%',
  };
});

export const SelectionContainer = styled('div', props => {
  return {
    lineHeight: '12px',
    display: 'flex',
    justifyContent: 'center',
  };
});

export const SelectRoot = styled('div', props => {
  const {
    $theme: {typography},
    $size,
  } = props;
  return {
    ...getFont($size, typography),
    boxSizing: 'border-box',
  };
});

export const SelectWrapper = styled('div', props => {
  const {
    $disabled,
    $error,
    $isFocused,
    $isOpen,
    $isPseudoFocused,
    $required,
    $size,
    $type,
    $searchable,
    $theme: {typography, colors, sizing, animation, borders},
  } = props;
  return {
    // outline: 'none',
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
        : 'ponter',
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

export const SelectValueWrapper = styled('span', props => {
  const {
    $size,
    $theme: {sizing},
  } = props;
  return {
    boxSizing: 'border-box',
    display: 'inline-block',
    paddingLeft: '16px',
    paddingRight: '42px',
    paddingTop: '8px',
    paddingBottom: '8px',
    ...getControlPadding($size, sizing),
  };
});

export const SelectPlaceholder = styled('div', props => {
  const {
    $disabled,
    $size,
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
    ...getControlPadding($size, sizing),
  };
});

export const SelectValue = styled('div', props => {
  const {
    $disabled,
    $size,
    $theme: {colors, sizing},
  } = props;
  return {
    boxSizing: 'border-box',
    position: 'absolute',
    top: '0',
    left: '0',
    height: '100%',
    ...getControlPadding($size, sizing),
  };
});

export const SelectInputWrapper = styled('div', props => {
  const {
    $theme: {sizing},
    $size,
  } = props;
  return {
    boxSizing: 'border-box',
    display: 'inline-block',
    // width: '5px',
    width: 'auto',
    background: 'transparent',
    border: 'none',
    boxShadow: 'none',
    outline: 'none',
    marginTop: '0',
    marginBottom: '0',
    marginLeft: '0',
    marginRight: '0',
  };
});

export const SelectInput = styled('input', props => {
  const {
    $theme: {typography, sizing},
    $size,
    $disabled,
    $searchable,
  } = props;
  return {
    ...getFont($size, typography),
    boxSizing: 'border-box',
    // width: '5px',
    width: $disabled || !$searchable ? '1px' : 'auto',
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

export const SelectArrow = styled('span', props => ({}));

export const SelectNoResults = styled('div', props => ({}));

export const SelectArrowIcon = styled('svg', props => {
  const {
    $theme: {colors},
    $disabled,
  } = props;
  return {
    ...getSvgStyles(props),
    color: $disabled ? colors.mono600 : colors.mono800,
    cursor: $disabled ? 'not-allowed' : 'pointer',
    position: 'absolute',
    right: '12px',
    display: 'inline-block',
    height: '100%',
  };
});

export const SelectClearIcon = styled('svg', props => {
  const {
    $theme: {colors},
  } = props;
  return {
    ...getSvgStyles(props),
    color: colors.mono800,
    cursor: 'pointer',
    position: 'absolute',
    right: '28px',
    display: 'inline-block',
    height: '100%',
  };
});

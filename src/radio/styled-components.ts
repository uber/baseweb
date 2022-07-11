/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import { styled } from '../styles/index';
import type { StylePropsT } from './types';

const DEFAULT = 0;
const HOVERED = 1;
const ACTIVE = 2;
type State = typeof DEFAULT | typeof HOVERED | typeof ACTIVE;

function getState(props): State {
  if (props.$isActive) return ACTIVE;
  if (props.$isHovered) return HOVERED;
  return DEFAULT;
}

function getOuterColor(props) {
  const {
    $theme: { colors },
    $disabled,
    $checked,
    $isFocusVisible,
    $error,
  } = props;
  if ($disabled) return colors.tickFillDisabled;
  if (!$checked) {
    if ($isFocusVisible) return colors.borderSelected;
    if ($error) return colors.tickBorderError;
    return colors.tickBorder;
  } else {
    if ($error) {
      switch (getState(props)) {
        case DEFAULT:
          return colors.tickFillErrorSelected;
        case HOVERED:
          return colors.tickFillErrorSelectedHover;
        case ACTIVE:
          return colors.tickFillErrorSelectedHoverActive;
      }
    } else {
      switch (getState(props)) {
        case DEFAULT:
          return colors.tickFillSelected;
        case HOVERED:
          return colors.tickFillSelectedHover;
        case ACTIVE:
          return colors.tickFillSelectedHoverActive;
      }
    }
  }

  return null;
}

function getInnerColor(props) {
  const { colors } = props.$theme;

  if (props.$disabled) {
    return colors.tickMarkFillDisabled;
  }

  if (!props.$checked) {
    if (props.$error) {
      switch (getState(props)) {
        case DEFAULT:
          return colors.tickFillError;
        case HOVERED:
          return colors.tickFillErrorHover;
        case ACTIVE:
          return colors.tickFillErrorHoverActive;
      }
    } else {
      switch (getState(props)) {
        case DEFAULT:
          return colors.tickFill;
        case HOVERED:
          return colors.tickFillHover;
        case ACTIVE:
          return colors.tickFillActive;
      }
    }
  } else {
    return colors.tickMarkFill;
  }
}

function getLabelPadding(props) {
  const { $labelPlacement = '', $theme } = props;
  let paddingDirection;
  switch ($labelPlacement) {
    case 'top':
      paddingDirection = 'Bottom';
      break;
    case 'bottom':
      paddingDirection = 'Top';
      break;
    case 'left':
      paddingDirection = $theme.direction === 'rtl' ? 'Left' : 'Right';
      break;
    default:
    case 'right':
      paddingDirection = $theme.direction === 'rtl' ? 'Right' : 'Left';
      break;
  }
  const { sizing } = $theme;
  const { scale300 } = sizing;
  return {
    [`padding${paddingDirection}`]: scale300,
  };
}

function getLabelColor(props) {
  const { $disabled, $theme } = props;
  const { colors } = $theme;
  return $disabled ? colors.contentSecondary : colors.contentPrimary;
}

export const RadioGroupRoot = styled<StylePropsT>(
  'div', // $FlowFixMe - suppressing due to webkit property
  (props) => {
    const { $disabled, $align } = props;
    return {
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: $align === 'horizontal' ? 'row' : 'column',
      alignItems: $align === 'horizontal' ? 'center' : 'flex-start',
      cursor: $disabled ? 'not-allowed' : 'pointer',
      '-webkit-tap-highlight-color': 'transparent',
    };
  }
);

export const Root = styled<StylePropsT>('label', (props) => {
  const { $disabled, $hasDescription, $labelPlacement, $theme, $align } = props;
  const { sizing } = $theme;
  const isHorizontal = $align === 'horizontal';

  const marginAfter = $theme.direction === 'rtl' ? 'Left' : 'Right';
  return {
    flexDirection: $labelPlacement === 'top' || $labelPlacement === 'bottom' ? 'column' : 'row',
    display: 'flex',
    alignItems: 'center',
    cursor: $disabled ? 'not-allowed' : 'pointer',
    marginTop: sizing.scale200,
    [`margin${marginAfter}`]: isHorizontal ? sizing.scale200 : null,
    marginBottom: $hasDescription && !isHorizontal ? null : sizing.scale200,
  } as {};
});

export const RadioMarkInner = styled<StylePropsT>('div', (props) => {
  const { animation, sizing } = props.$theme;

  return {
    backgroundColor: getInnerColor(props),
    borderTopLeftRadius: '50%',
    borderTopRightRadius: '50%',
    borderBottomRightRadius: '50%',
    borderBottomLeftRadius: '50%',
    height: props.$checked ? sizing.scale200 : sizing.scale550,
    transitionDuration: animation.timing200,
    transitionTimingFunction: animation.easeOutCurve,
    width: props.$checked ? sizing.scale200 : sizing.scale550,
  };
});

export const RadioMarkOuter = styled<StylePropsT>('div', (props) => {
  const { animation, sizing } = props.$theme;

  return {
    alignItems: 'center',
    backgroundColor: getOuterColor(props),
    borderTopLeftRadius: '50%',
    borderTopRightRadius: '50%',
    borderBottomRightRadius: '50%',
    borderBottomLeftRadius: '50%',
    boxShadow:
      props.$isFocusVisible && props.$checked ? `0 0 0 3px ${props.$theme.colors.accent}` : 'none',
    display: 'flex',
    height: sizing.scale700,
    justifyContent: 'center',
    marginTop: sizing.scale0,
    marginRight: sizing.scale0,
    marginBottom: sizing.scale0,
    marginLeft: sizing.scale0,
    outline: 'none',
    verticalAlign: 'middle',
    width: sizing.scale700,
    flexShrink: 0,
    transitionDuration: animation.timing200,
    transitionTimingFunction: animation.easeOutCurve,
  } as {};
});

export const Label = styled<StylePropsT>('div', (props) => {
  const {
    $theme: { typography },
  } = props;
  return {
    verticalAlign: 'middle',
    ...getLabelPadding(props),
    color: getLabelColor(props),
    ...typography.LabelMedium,
  };
});

// tricky style for focus event cause display: none doesn't work
export const Input = styled('input', {
  width: 0,
  height: 0,
  marginTop: 0,
  marginRight: 0,
  marginBottom: 0,
  marginLeft: 0,
  paddingTop: 0,
  paddingRight: 0,
  paddingBottom: 0,
  paddingLeft: 0,
  clip: 'rect(0 0 0 0)',
  position: 'absolute',
});

export const Description = styled<StylePropsT>('div', (props) => {
  const { $theme, $align } = props;
  const isHorizontal = $align === 'horizontal';
  const marginBefore = $theme.direction === 'rtl' ? 'Right' : 'Left';
  const marginAfter = $theme.direction === 'rtl' ? 'Left' : 'Right';
  return {
    ...$theme.typography.ParagraphSmall,
    color: $theme.colors.contentSecondary,
    cursor: 'auto',
    [`margin${marginBefore}`]: $align === 'horizontal' ? null : $theme.sizing.scale900,
    [`margin${marginAfter}`]: isHorizontal ? $theme.sizing.scale200 : null,
    maxWidth: '240px',
  };
});

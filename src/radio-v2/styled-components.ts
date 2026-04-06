/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import { styled, type Theme } from '../styles';
import type { StyleProps } from './types';
import { ALIGN, LABEL_PLACEMENT } from './constants';
import {
  getOverlayColor,
  getFocusOutlineStyle,
} from '../utils/get-shared-styles';

type StylePropsWithTheme = StyleProps & {
  $theme: Theme;
};

function getOuterColor(props: StylePropsWithTheme) {
  const {
    $theme: { colors },
    $disabled,
    $error,
  } = props;
  return $disabled
    ? colors.contentStateDisabled
    : $error
      ? colors.tagRedBorderSecondarySelected
      : colors.contentPrimary;
}

function getLabelColor(props: StylePropsWithTheme) {
  const { $disabled, $theme } = props;
  const { colors } = $theme;
  return $disabled ? colors.contentSecondary : colors.contentPrimary;
}

export const RadioGroupRoot = styled<'div', StyleProps>('div', (props) => {
  const { $align, $labelPlacement } = props;

  return {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: $align === ALIGN.horizontal ? 'row' : 'column',
    alignItems:
      $align === ALIGN.horizontal && $labelPlacement === LABEL_PLACEMENT.top
        ? 'flex-end'
        : 'flex-start',
    columnGap: props.$theme.sizing.scale600,
    rowGap: props.$theme.sizing.scale300,
  };
});

RadioGroupRoot.displayName = 'RadioGroupRoot';

export const Root = styled<'label', StyleProps>('label', (props) => {
  const { $disabled, $labelPlacement, $theme } = props;
  const { sizing } = $theme;
  const isHorizontalLabelPlacement =
    $labelPlacement === LABEL_PLACEMENT.left ||
    $labelPlacement === LABEL_PLACEMENT.right;
  const isVerticalLabelPlacement =
    $labelPlacement === LABEL_PLACEMENT.top ||
    $labelPlacement === LABEL_PLACEMENT.bottom;

  return {
    flexDirection: isVerticalLabelPlacement ? 'column' : 'row',
    display: 'inline-flex',
    alignItems: isHorizontalLabelPlacement ? 'flex-start' : 'center',
    cursor: $disabled ? 'not-allowed' : 'pointer',
    ...(isVerticalLabelPlacement
      ? { rowGap: sizing.scale100 }
      : isHorizontalLabelPlacement
        ? { columnGap: sizing.scale100 }
        : {}),
    '@media (pointer: coarse)': {
      // Increase target size for touch devices to meet the minimum touch target size of 48x48dp
      padding: sizing.scale300,
    },
  };
});

Root.displayName = 'Root';

export const RadioBackplate = styled<'div', StyleProps>('div', (props) => {
  const { sizing } = props.$theme;
  const { hoveredColor, pressedColor } = getOverlayColor(props);

  return {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
    borderRadius: sizing.scale300,
    paddingTop: sizing.scale300,
    paddingBottom: sizing.scale300,
    paddingLeft: sizing.scale300,
    paddingRight: sizing.scale300,
    '@media (hover: hover)': {
      ':hover': {
        backgroundColor: hoveredColor,
      },
    },
    ':active': {
      backgroundColor: pressedColor,
    },

    minHeight: sizing.scale900,
    minWidth: sizing.scale900,
  };
});

RadioBackplate.displayName = 'RadioBackplate';

export const RadioMarkInner = styled<'div', StyleProps>('div', (props) => {
  const { $theme, $checked, $isActive, $isHovered, $disabled } = props;
  const { animation, colors } = $theme;
  const { hoveredColor, pressedColor } = getOverlayColor(props);

  return {
    borderTopLeftRadius: '50%',
    borderTopRightRadius: '50%',
    borderBottomRightRadius: '50%',
    borderBottomLeftRadius: '50%',
    height: $checked ? '5px' : '100%',
    width: $checked ? '5px' : '100%',
    backgroundColor: colors.contentInversePrimary,
    // Add overlay for hover and pressed states with box-shadow (instead of background-color) to prevent RadioMarkOuter's background color bleeding through
    // We also want this visual effect when hovering/pressing on backplate so using $isActive, $isHovered instead of css selectors.
    boxShadow: !$disabled
      ? $isHovered
        ? `inset 999px 999px 0px ${hoveredColor}`
        : $isActive
          ? `inset 999px 999px 0px ${pressedColor}`
          : 'none'
      : 'none',
    // Animations for height and width changes - transition when checking/unchecking radio
    transitionProperty: 'width, height',
    transitionDuration: animation.timing200,
    transitionTimingFunction: animation.easeOutCurve,
  };
});

RadioMarkInner.displayName = 'RadioMarkInner';

export const RadioMarkOuter = styled<'div', StyleProps>('div', (props) => {
  const { $theme, $checked, $isFocusVisible } = props;
  const { sizing } = $theme;
  const focusRingStyle = getFocusOutlineStyle($theme);

  return {
    display: 'flex',
    height: '17px',
    width: '17px',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    boxSizing: 'border-box',
    borderWidth: sizing.scale0,
    borderStyle: 'solid',
    borderColor: getOuterColor(props),
    backgroundColor: getOuterColor(props),
    borderTopLeftRadius: '50%',
    borderTopRightRadius: '50%',
    borderBottomRightRadius: '50%',
    borderBottomLeftRadius: '50%',
    verticalAlign: 'middle',
    ...($checked && $isFocusVisible ? focusRingStyle : {}),
  };
});

RadioMarkOuter.displayName = 'RadioMarkOuter';

export const LabelWrapper = styled<'div', StyleProps>('div', (props) => {
  const { $labelPlacement, $theme, $align } = props;
  const { sizing } = $theme;

  return {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start', // don't stretch label and description(for example, when label is a select component)
    ...($labelPlacement === LABEL_PLACEMENT.left ||
    $labelPlacement === LABEL_PLACEMENT.right
      ? { paddingTop: sizing.scale300 }
      : {}), // add top padding when label is on left/right to align with radio center
    rowGap: sizing.scale0,
    //Horizontal: Not recommended when the text needs to wrap. If necessary, let the text wrap to 3 lines maximum and truncate.
    ...($align === ALIGN.horizontal ? { maxWidth: '240px' } : {}),
  };
});

LabelWrapper.displayName = 'LabelWrapper';

// This style is design from horizontal alignment
// Not recommended when the text needs to wrap. If necessary, let the text wrap to 3 lines maximum and truncate.
const max3LinesStyle = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: 3,
  WebkitBoxOrient: 'vertical' as const,
};

export const Label = styled<'div', StyleProps>('div', (props) => {
  const {
    $theme: { typography },
    $align,
  } = props;
  return {
    verticalAlign: 'middle',
    color: getLabelColor(props),
    ...typography.LabelSmall,
    ...($align === ALIGN.horizontal ? max3LinesStyle : {}),
  };
});

Label.displayName = 'Label';

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

Input.displayName = 'Input';

export const Description = styled<'div', StyleProps>('div', (props) => {
  const { $theme, $align } = props;
  return {
    ...$theme.typography.ParagraphSmall,
    color: $theme.colors.contentSecondary,
    cursor: 'auto',
    ...($align === ALIGN.horizontal ? max3LinesStyle : {}),
  };
});
Description.displayName = 'Description';

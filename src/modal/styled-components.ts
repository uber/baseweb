/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import { styled } from '../styles';
import { SIZE, SIZE_WIDTHS } from './constants';
import type { SharedStylePropsArgT, SizePropT } from './types';

type SizeStyleT = {
  maxWidth: string | number;
  width?: string | number | null;
  alignSelf?: string;
};

function getSizeStyles($size: SizePropT): SizeStyleT {
  const styles: SizeStyleT = {
    maxWidth: '100%',
    width: null,
  };

  if (typeof $size === 'number') {
    styles.width = `${$size}px`;
  } else if (SIZE[$size]) {
    styles.width = SIZE_WIDTHS[$size];
  } else if (typeof $size === 'string') {
    styles.width = $size;
  }
  if ($size === SIZE.full) {
    styles.alignSelf = 'stretch';
  }

  return styles;
}

export const Root = styled<'div', SharedStylePropsArgT>('div', (props) => {
  const { $isOpen } = props;
  return {
    position: 'fixed',
    overflow: 'auto',
    right: 0,
    bottom: 0,
    top: 0,
    left: 0,
    pointerEvents: $isOpen ? 'auto' : 'none',
  };
});

export const DialogContainer = styled<'div', SharedStylePropsArgT>('div', (props) => {
  const { $animate, $isOpen, $isVisible, $theme } = props;
  const animationRules = {
    transitionProperty: 'opacity',
    transitionDuration: $theme.animation.timing400,
    transitionTimingFunction: $theme.animation.easeOutCurve,
  };

  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    minHeight: '100%',
    userSelect: 'none',
    pointerEvents: 'auto',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    // Remove grey highlight
    WebkitTapHighlightColor: 'transparent',
    opacity: $isVisible && $isOpen ? 1 : 0,
    ...($animate ? animationRules : null),
  };
});

export const Dialog = styled<'div', SharedStylePropsArgT>('div', (props) => {
  const { $animate, $isOpen, $isVisible, $size, $theme } = props;
  return {
    position: 'relative',
    backgroundColor: $theme.colors.backgroundPrimary,
    borderTopLeftRadius: $theme.borders.radius500,
    borderTopRightRadius: $theme.borders.radius500,
    borderBottomRightRadius: $theme.borders.radius500,
    borderBottomLeftRadius: $theme.borders.radius500,
    marginLeft: $theme.sizing.scale600,
    marginTop: $theme.sizing.scale600,
    marginRight: $theme.sizing.scale600,
    marginBottom: $theme.sizing.scale600,
    ...getSizeStyles($size),

    // Animation
    opacity: $isVisible && $isOpen ? 1 : 0,
    transform: $isVisible ? 'translateY(0)' : 'translateY(20px)',
    ...($animate
      ? {
          transitionProperty: 'opacity, transform',
          transitionDuration: $theme.animation.timing400,
          transitionTimingFunction: $theme.animation.easeOutCurve,
        }
      : null),
    // Reset interactivity properties set by container
    userSelect: 'text',
    pointerEvents: $isOpen ? 'all' : 'none',

    // We move focus to the modal, but we don't want the blue outline style
    ':focus': {
      outline: 'none',
    },
  } as {};
});

export const Close = styled<'button', SharedStylePropsArgT>('button', (props) => {
  const { $theme, $isFocusVisible } = props;
  const dir: string = $theme.direction === 'rtl' ? 'left' : 'right';
  return {
    // Reset button styles
    background: 'transparent',
    outline: 0,
    paddingLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,

    // colors
    color: $theme.colors.modalCloseColor,
    transitionProperty: 'color, border-color',
    transitionDuration: $theme.animation.timing200,
    borderLeftWidth: '1px',
    borderRightWidth: '1px',
    borderTopWidth: '1px',
    borderBottomWidth: '1px',
    borderLeftStyle: 'solid',
    borderRightStyle: 'solid',
    borderTopStyle: 'solid',
    borderBottomStyle: 'solid',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    ':hover': {
      color: $theme.colors.modalCloseColorHover,
    },
    ':focus': {
      outline: $isFocusVisible ? `3px solid ${$theme.colors.accent}` : 'none',
    },

    // Positioning
    position: 'absolute',
    top: $theme.sizing.scale500,
    [dir]: $theme.sizing.scale500,
    width: $theme.sizing.scale800,
    height: $theme.sizing.scale800,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
  };
});

export const ModalHeader = styled('div', ({ $theme }) => {
  const marginStartDir: string = $theme.direction === 'rtl' ? 'marginRight' : 'marginLeft';
  const marginEndDir: string = $theme.direction === 'rtl' ? 'marginLeft' : 'marginRight';

  return {
    ...$theme.typography.font550,
    color: $theme.colors.contentPrimary,
    marginTop: $theme.sizing.scale900,
    marginBottom: $theme.sizing.scale600,
    [marginStartDir]: $theme.sizing.scale800,
    // Slightly more margin than left side to leave room for close button
    [marginEndDir]: $theme.sizing.scale900,
  };
});

export const ModalBody = styled('div', ({ $theme }) => ({
  ...$theme.typography.font200,
  color: $theme.colors.contentSecondary,
  marginTop: $theme.sizing.scale600,
  marginLeft: $theme.sizing.scale800,
  marginRight: $theme.sizing.scale800,
  marginBottom: $theme.sizing.scale700,
}));

export const ModalFooter = styled('div', ({ $theme }) => ({
  ...$theme.typography.font200,
  marginTop: $theme.sizing.scale700,
  marginLeft: $theme.sizing.scale800,
  marginRight: $theme.sizing.scale800,
  paddingTop: $theme.sizing.scale500,
  paddingBottom: $theme.sizing.scale500,
  textAlign: $theme.direction === 'rtl' ? 'left' : 'right',
}));

/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import {styled} from '../styles/index.js';
import {ANCHOR_POSITIONS} from './constants.js';
export const getAnchorTransform = (
  //TODO fix this... getting a weird error about file not found...
  // anchor: AnchorPositionsT,
  anchor: any,
  anchorSize: number,
) =>
  ({
    [ANCHOR_POSITIONS.none]: ``,
    [ANCHOR_POSITIONS.topLeft]: `translate(${anchorSize}px, ${anchorSize}px)`,
    [ANCHOR_POSITIONS.topRight]: `translate(-100%, ${anchorSize}px)`,
    [ANCHOR_POSITIONS.bottomLeft]: `translate(${anchorSize}px, -100%)`,
    [ANCHOR_POSITIONS.bottomRight]: `translate(${anchorSize}px, ${anchorSize}px)`,
  }[anchor]);

export const StyledDragShadowContainer = styled(
  'div',
  ({$theme, height, width, dragging}) => {
    return {
      width: `${width}px`,
      height: `${height}px`,
      opacity: dragging ? 1 : 0,
      visibility: dragging ? 'visible' : 'hidden',
      transition: `${$theme.animation.timing300} ${$theme.animation.easeOutCurve} all`,
      position: 'relative',
      boxShadow: $theme.lighting.shadow600,
    };
  },
);

export const StyledDragShadow = styled('div', ({$theme, background, width}) => {
  return {
    background,
    borderRadius: '50%',
    width: `${width}px`,
    height: `${4}px`,
    position: 'absolute',
    bottom: 0,
  };
});

export const StyledNeedle = styled('div', ({$theme, background, height}) => {
  return {
    background,
    width: '4px',
    height: height + 'px',
    boxShadow: $theme.lighting.shadow600,
  };
});

export const StyledFloatingMarkerRoot = styled('div', () => {
  return {
    position: 'relative',
  };
});

export const StyledFloatingMarkerPinHeadContainer = styled(
  'div',
  ({$theme, anchor, anchorSize}) => {
    return {
      position: 'absolute',
      transition: `${$theme.animation.timing300} ${$theme.animation.easeOutCurve} all`,
      transform: getAnchorTransform(anchor, anchorSize),
    };
  },
);

export const StyledFloatingMarkerAnchorContainer = styled('div', () => {
  return {
    position: 'absolute',
  };
});

export const StyledFixedMarkerRoot = styled('div', () => {
  return {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  };
});

export const StyledFixedMarkerDragContainer = styled(
  'div',
  ({$theme, translateAmount, performTranslate}) => {
    return {
      transform: `translateY(${
        performTranslate ? '0px' : `${translateAmount}px`
      })`,
      transition: `${$theme.animation.timing300} ${$theme.animation.easeOutCurve} all`,
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
    };
  },
);

export const StyledOuterXSmallAnchor = styled(
  'div',
  ({$theme, round, background}) => {
    return {
      background,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '16px',
      width: '16px',
      borderRadius: round ? '50%' : 0,
      boxShadow: $theme.lighting.shadow600,
    };
  },
);

export const StyledInnerXSmallAnchor = styled('div', ({round, color}) => {
  return {
    background: color,
    height: '4px',
    width: '4px',
    borderRadius: round ? '50%' : 0,
  };
});

export const StyledPinHead = styled(
  'div',
  ({$theme, height, background, gridTemplateColumns, type, forceCircle}) => {
    const sharedStyles = {
      fixed: {
        padding: '0px 12px',
        borderRadius: height + 'px',
      },
      floating: {
        padding: '0px 8px',
      },
    };

    return {
      background,
      height: height + 'px',
      display: 'grid',
      gridTemplateColumns,
      gap: '8px',
      boxShadow: $theme.lighting.shadow600,
      whiteSpace: 'nowrap',
      ...sharedStyles[type],
      ...(forceCircle && {
        width: height + 'px',
        display: 'flex',
        justifyContent: 'center',
        boxSizing: 'border-box',
      }),
    };
  },
);

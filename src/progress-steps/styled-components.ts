/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import { styled } from '../styles';
import { ORIENTATION } from './constants';
import type { StyleProps } from './types';

export const StyledProgressSteps = styled<'ol', StyleProps>('ol', ({ $theme, $orientation }) => {
  const horizontalStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  };
  const verticalStyles = {
    display: 'inline-block',
  };
  return {
    ...($orientation === ORIENTATION.horizontal ? horizontalStyles : verticalStyles),
    marginBottom: 0,
    marginTop: 0,
    paddingTop: $theme.sizing.scale300,
    paddingRight: $theme.sizing.scale100,
    paddingLeft: $theme.sizing.scale100,
    paddingBottom: $theme.sizing.scale300,
  };
});

StyledProgressSteps.displayName = 'StyledProgressSteps';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const StyledStep = styled<'li', StyleProps>('li', ({ $orientation }) => {
  const horizontalStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  } as const;

  return {
    listStyleType: 'none',
    position: 'relative',
    overflow: 'visible',
    ...($orientation === ORIENTATION.horizontal ? horizontalStyles : {}),
  };
});

StyledStep.displayName = 'StyledStep';

export const StyledIconContainer = styled<'div', StyleProps>(
  'div',
  ({ $theme, $isActive, $orientation }) => {
    const size = $isActive ? $theme.sizing.scale700 : $theme.sizing.scale500;
    const font = $theme.typography.LabelMedium;

    const getOrientationStyles = (orientation) => {
      if (orientation === ORIENTATION.horizontal) {
        return {
          marginLeft: '50px',
          height: '20px',
          width: '20px',
        };
      }

      let marginLeft = $isActive ? $theme.sizing.scale750 : '26px';
      let marginRight = $isActive ? $theme.sizing.scale750 : '26px';
      const titlePad = $theme.sizing.scale800;
      const marginTop = `calc(${titlePad} + (${font.lineHeight} - ${size}) / 2)`;
      if ($theme.direction === 'rtl') {
        [marginLeft, marginRight] = [marginRight, marginLeft];
      }
      return {
        float: $theme.direction === 'rtl' ? 'right' : 'left',
        marginRight,
        marginLeft,
        marginTop,

        width: size,
        height: size,
        lineHeight: size,
      };
    };

    return {
      ...getOrientationStyles($orientation),
      backgroundColor: $theme.colors.backgroundPrimary,
      float: $theme.direction === 'rtl' ? 'right' : 'left',
      textAlign: 'center',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    };
  }
);

StyledIconContainer.displayName = 'StyledIconContainer';

export const StyledIcon = styled<'div', StyleProps>(
  'div',
  ({ $theme, $isActive, $isCompleted, $orientation }) => {
    let currentColor = $theme.colors.contentTertiary;
    let size = $theme.sizing.scale300;

    if ($isCompleted) {
      currentColor = $theme.colors.contentPrimary;
    } else if ($isActive) {
      currentColor = $theme.colors.progressStepsActiveFill;
    }

    if ($isActive) {
      size = $theme.sizing.scale600;
    }

    const verticalStyles = {
      float: $theme.direction === 'rtl' ? 'right' : 'left',
    } as const;

    return {
      width: size,
      height: size,
      lineHeight: size,
      borderTopLeftRadius: size,
      borderTopRightRadius: size,
      borderBottomRightRadius: size,
      borderBottomLeftRadius: size,
      backgroundColor: currentColor,
      textAlign: 'center',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      ...($orientation === ORIENTATION.horizontal ? {} : verticalStyles),
    };
  }
);

StyledIcon.displayName = 'StyledIcon';

export const StyledInnerIcon = styled<'div', StyleProps>('div', ({ $theme }) => {
  return {
    width: $theme.sizing.scale300,
    height: $theme.sizing.scale300,
    lineHeight: $theme.sizing.scale300,
    borderTopLeftRadius: $theme.sizing.scale300,
    borderTopRightRadius: $theme.sizing.scale300,
    borderBottomRightRadius: $theme.sizing.scale300,
    borderBottomLeftRadius: $theme.sizing.scale300,
    backgroundColor: $theme.colors.progressStepsActiveText,
    textAlign: 'center',
  };
});

StyledInnerIcon.displayName = 'StyledInnerIcon';

export const StyledContent = styled<'div', StyleProps>('div', ({ $theme, $orientation }) => {
  if ($orientation === ORIENTATION.horizontal) {
    return {
      marginTop: '8px',
      width: '120px',
      flex: 'display',
      flexDirection: 'column',
      justifyContent: 'start',
    } as const;
  }

  const marginDir: string = $theme.direction === 'rtl' ? 'marginRight' : 'marginLeft';
  return {
    [marginDir]: $theme.sizing.scale1600,
  } as const;
});

StyledContent.displayName = 'StyledContent';

export const StyledContentTitle = styled<'div', StyleProps>(
  'div',
  ({ $theme, $isCurrent, $isCompleted, $orientation }) => {
    let color = $theme.colors.contentTertiary;
    if ($isCompleted) {
      color = $theme.colors.contentPrimary;
    } else if ($isCurrent) {
      color = $theme.colors.contentPrimary;
    }
    let font = $theme.typography.LabelMedium;

    const horizontalStyles = {
      textAlign: 'center' as const,
    };
    const verticalStyles = {
      paddingTop: $theme.sizing.scale800,
      paddingBottom: $theme.sizing.scale800,
    };

    return {
      ...font,
      color,
      ...($orientation === ORIENTATION.horizontal ? horizontalStyles : verticalStyles),
    };
  }
);

StyledContentTitle.displayName = 'StyledContentTitle';

export const StyledContentTail = styled<'div', StyleProps>(
  'div',
  ({ $theme, $isCompleted, $isActive, $orientation }) => {
    const getOrientationStyles = (orientation) => {
      const dir: string = $theme.direction === 'rtl' ? 'right' : 'left';

      // horizontal styles
      if (orientation === ORIENTATION.horizontal) {
        return {
          position: 'relative',
          top: '9px',
          marginLeft: '-48px',
          marginRight: '-48px',
          height: $theme.sizing.scale0,
          width: '100%',
        } as const;
      }

      // vertical styles
      let size = $isActive ? $theme.sizing.scale700 : $theme.sizing.scale500;
      let font = $theme.typography.LabelMedium;
      let titlePad = $theme.sizing.scale800;

      return {
        position: 'absolute',
        marginTop: `calc(${titlePad} + (${font.lineHeight} + ${size}) / 2)`,
        [dir]: '31px',
        top: 0,
        height: `calc(100% + ${$theme.sizing.scale500})`,
        marginBottom: 0,
        width: $theme.sizing.scale0,
        display: 'inline-block',
      } as const;
    };

    return {
      ...getOrientationStyles($orientation),
      backgroundColor: $isCompleted ? $theme.colors.borderSelected : $theme.colors.borderOpaque,
    };
  }
);

StyledContentTail.displayName = 'StyledContentTail';

export const StyledContentDescription = styled<'div', StyleProps>('div', ({ $theme }) => {
  return {
    marginBottom: $theme.sizing.scale700,
  };
});

StyledContentDescription.displayName = 'StyledContentDescription';

export const StyledNumberStep = styled<'li', StyleProps>('li', ({ $orientation }) => {
  const horizontalStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  } as const;

  return {
    listStyleType: 'none',
    position: 'relative',
    overflow: 'visible',
    ...($orientation === ORIENTATION.horizontal ? horizontalStyles : {}),
  };
});

StyledNumberStep.displayName = 'StyledNumberStep';

export const StyledNumberIcon = styled<'div', StyleProps>(
  'div',
  ({ $theme, $isActive, $isCurrent, $isCompleted, $orientation }) => {
    let backgroundColor = $theme.colors.backgroundTertiary;
    let color = $theme.colors.contentPrimary;
    const size = $theme.sizing.scale1200;
    const font = $theme.typography.ParagraphLarge;

    if ($isCompleted) {
      color = $theme.colors.progressStepsCompletedText;
      backgroundColor = $theme.colors.progressStepsCompletedFill;
    } else if ($isCurrent) {
      color = $theme.colors.progressStepsActiveText;
      backgroundColor = $theme.colors.progressStepsActiveFill;
    }

    const getOrientationStyles = (orientation) => {
      if (orientation === ORIENTATION.horizontal) {
        return {
          marginLeft: '36px',
        };
      } else {
        let titlePad = $theme.sizing.scale800;
        let titleFont = $theme.typography.LabelMedium;

        return {
          marginLeft: $theme.sizing.scale300,
          marginRight: $theme.sizing.scale550,
          marginTop: `calc(${titlePad} + (${titleFont.lineHeight} - ${size}) / 2)`,
        };
      }
    };

    return {
      ...getOrientationStyles($orientation),
      width: size,
      height: size,
      borderTopLeftRadius: size,
      borderTopRightRadius: size,
      borderBottomRightRadius: size,
      borderBottomLeftRadius: size,
      backgroundColor,
      color,
      float: $theme.direction === 'rtl' ? 'right' : 'left',
      textAlign: 'center',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      ...font,
      ...($isActive
        ? {
            position: 'relative',
            '::before': {
              content: '""',
              position: 'absolute',
              top: '-4px',
              left: '-4px',
              width: `calc(100% + 8px)`,
              height: `calc(100% + 8px)`,
              borderRadius: '50%',
              border: `2px solid ${$theme.colors.progressStepsActiveFill}`,
              boxSizing: 'border-box',
            },
          }
        : {}),
    };
  }
);

StyledNumberIcon.displayName = 'StyledNumberIcon';

export const StyledNumberContentTail = styled<'div', StyleProps>(
  'div',
  ({ $theme, $isCompleted, $orientation, $isActive, $isRightBeforeActive }) => {
    const getOrientationStyles = (orientation) => {
      const dir: string = $theme.direction === 'rtl' ? 'right' : 'left';

      // horizontal styles
      if (orientation === ORIENTATION.horizontal) {
        return {
          position: 'relative',
          top: '23px',
          marginLeft: $isActive ? '-32px' : '-36px',
          marginRight: $isRightBeforeActive ? '-32px' : '-36px',
          height: $theme.sizing.scale0,
          width: '100%',
        } as const;
      }

      // vertical styles
      const size = $theme.sizing.scale950;
      const titleFont = $theme.typography.LabelMedium;
      const titlePad = $theme.sizing.scale800;
      const marginTop = `calc(${titlePad} + ${size} + (${titleFont.lineHeight} - ${size}) / 2)`;

      return {
        position: 'absolute',
        [dir]: '31px',
        top: $isActive ? '10px' : '6px',
        height: `calc(100% - ${
          $isActive || $isRightBeforeActive ? $theme.sizing.scale900 : $theme.sizing.scale850
        })`,
        paddingBottom: 0,
        marginTop,
        width: $theme.sizing.scale0,
        display: 'inline-block',
      } as const;
    };

    return {
      ...getOrientationStyles($orientation),
      backgroundColor: $isCompleted
        ? $theme.colors.contentPrimary
        : $theme.colors.backgroundTertiary,
    };
  }
);

StyledNumberContentTail.displayName = 'StyledNumberContentTail';

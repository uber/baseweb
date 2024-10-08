/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import { styled } from '../styles';
import type { StyleProps } from './types';

export const StyledFileRow = styled<'li', StyleProps>('li', (props) => {
  const {
    $theme: { animation, sizing },
  } = props;
  return {
    animationDuration: animation.timing400,
    animationFillMode: 'forwards',
    animationIterationCount: 1,
    animationTimingFunction: animation.easeOutQuinticCurve,
    animationName: {
      '0%': {
        transform: 'translateY(-32px)',
        opacity: 0,
      },
      '50%': {
        opacity: 1,
      },
      '100%': {
        transform: 'translateY(0px)',
        opacity: 1,
      },
    },
    paddingTop: sizing.scale500,
    paddingRight: sizing.scale500,
    paddingBottom: sizing.scale500,
    paddingLeft: sizing.scale500,
    gap: sizing.scale500,
    height: 'fit-content',
    display: 'flex',
    alignItems: 'center',
  };
});
StyledFileRow.displayName = 'StyledFileRow';

export const StyledFileRowColumn = styled<'div', StyleProps>('div', () => {
  return {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    flexGrow: 1,
    overflow: 'auto',
  };
});
StyledFileRowColumn.displayName = 'StyledFileRowColumn';

export const StyledFileRowContent = styled<'div', StyleProps>('div', (props) => {
  const {
    $theme: { sizing },
  } = props;
  return {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    gap: sizing.scale500,
    justifyContent: 'space-between',
    width: '100%',
    height: sizing.scale1000,
  };
});
StyledFileRowContent.displayName = 'StyledFileRowContent';

export const StyledFileRowFileName = styled<'div', StyleProps>('div', (props) => {
  const {
    $theme: { colors, typography },
  } = props;
  return {
    ...typography.LabelSmall,
    color: colors.contentPrimary,
    width: '100%',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  };
});
StyledFileRowColumn.displayName = 'StyledFileRowColumn';

export const StyledFileRowText = styled<'div', StyleProps>('div', (props) => {
  const {
    $theme: { sizing },
  } = props;
  return {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    gap: sizing.scale0,
    flexGrow: 1,
    overflow: 'auto',
  };
});
StyledFileRowColumn.displayName = 'StyledFileRowColumn';

export const StyledFileRowUploadMessage = styled<'div', StyleProps>('div', (props) => {
  const {
    $color,
    $theme: { sizing, typography },
  } = props;
  return {
    ...typography.ParagraphXSmall,
    color: $color,
    alignItems: 'center',
    gap: sizing.scale100,
    display: 'flex',
    flexDirection: 'row',
  };
});
StyledFileRowUploadMessage.displayName = 'StyledFileRowUploadMessage';

export const StyledFileRowUploadText = styled<'div', StyleProps>('div', (props) => {
  const { $color } = props;
  return {
    color: $color ? $color : 'inherit',
    width: '100%',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  };
});
StyledFileRowUploadText.displayName = 'StyledFileRowUploadText';

export const StyledFileRows = styled<'ul', StyleProps>('ul', (props) => {
  const {
    $theme: { animation, borders, sizing },
  } = props;
  return {
    animationDuration: animation.timing500,
    animationIterationCount: 1,
    animationTimingFunction: animation.easeInOutQuinticCurve,
    animationName: {
      '0%': {
        transform: 'translateY(-32px)',
      },
      '100%': {
        transform: 'translateX(-0px)',
      },
    },
    ...borders.border200,
    borderRadius: borders.radius400,
    borderWidth: sizing.scale0,
    listStyle: 'none',
    padding: 0,
    marginTop: 0,
    marginBottom: sizing.scale300,
  };
});
StyledFileRows.displayName = 'StyledFileRows';

export const StyledHint = styled<'div', StyleProps>('div', (props) => {
  const {
    $fileCount,
    $theme: { animation, colors, typography },
  } = props;
  let fontColor = colors.contentTertiary;
  const animations =
    $fileCount > 0
      ? {
          animationDuration: animation.timing500,
          animationIterationCount: 1,
          animationTimingFunction: animation.easeInOutQuinticCurve,
          animationName: {
            '0%': {
              transform: 'translateY(-32px)',
            },
            '100%': {
              transform: 'translateX(-0px)',
            },
          },
        }
      : {};
  return {
    ...animations,
    ...typography.ParagraphSmall,
    color: fontColor,
  };
});
StyledHint.displayName = 'StyledHint';

export const StyledImagePreviewThumbnail = styled<'img', StyleProps>('img', (props) => {
  const {
    $alt,
    $src,
    $theme: { borders, colors },
  } = props;
  return {
    alt: $alt,
    borderRadius: borders.radius300,
    outline: `1px ${colors.borderTransparent}`,
    className: 'thumb',
    src: $src,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  };
});
StyledImagePreviewThumbnail.displayName = 'StyledImagePreviewThumbnail';

export const StyledItemPreviewContainer = styled<'div', StyleProps>('div', (props) => {
  const {
    $theme: { sizing },
  } = props;
  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    width: sizing.scale1200,
    height: sizing.scale1200,
  };
});
StyledItemPreviewContainer.displayName = 'StyledItemPreviewContainer';

export const StyledLabel = styled<'label', StyleProps>('label', (props) => {
  const {
    $disabled,
    $theme: { colors, sizing, typography },
  } = props;
  return {
    ...typography.LabelSmall,
    width: '100%',
    color: $disabled ? colors.contentStateDisabled : colors.contentPrimary,
    display: 'block',
    marginBottom: sizing.scale300,
  };
});
StyledLabel.displayName = 'StyledLabel';

export const StyledParentRoot = styled<'div', StyleProps>('div', () => {
  return {
    display: 'flex',
    flexDirection: 'column',
  };
});
StyledParentRoot.displayName = 'StyledParentRoot';

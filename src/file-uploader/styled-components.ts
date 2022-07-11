/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import { styled } from '../styles/index';
import type { StylePropsT } from './types';

export const StyledFileDragAndDrop = styled<StylePropsT>('div', (props) => {
  const borderColor = props.$isDragActive
    ? props.$theme.colors.borderAccent
    : props.$theme.colors.fileUploaderBorderColorDefault;
  const borderStyle = props.$afterFileDrop ? 'none' : 'dashed';
  return {
    alignItems: 'center',
    backgroundColor: props.$isDragActive
      ? props.$theme.colors.backgroundLightAccent
      : props.$theme.colors.fileUploaderBackgroundColor,
    borderLeftColor: borderColor,
    borderRightColor: borderColor,
    borderTopColor: borderColor,
    borderBottomColor: borderColor,
    borderLeftStyle: borderStyle,
    borderRightStyle: borderStyle,
    borderTopStyle: borderStyle,
    borderBottomStyle: borderStyle,
    borderLeftWidth: props.$theme.sizing.scale0,
    borderRightWidth: props.$theme.sizing.scale0,
    borderTopWidth: props.$theme.sizing.scale0,
    borderBottomWidth: props.$theme.sizing.scale0,
    borderTopLeftRadius: props.$theme.borders.radius400,
    borderTopRightRadius: props.$theme.borders.radius400,
    borderBottomLeftRadius: props.$theme.borders.radius400,
    borderBottomRightRadius: props.$theme.borders.radius400,
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    outline: 'none',
    paddingTop: props.$theme.sizing.scale900,
    paddingRight: props.$theme.sizing.scale800,
    paddingBottom: props.$afterFileDrop
      ? props.$theme.sizing.scale300
      : props.$theme.sizing.scale900,
    paddingLeft: props.$theme.sizing.scale800,
    width: '100%',
  } as {};
});

export const StyledContentMessage = styled<StylePropsT>(
  'div',
  ({ $theme, $afterFileDrop, $isDragActive }) =>
    ({
      ...($afterFileDrop ? $theme.typography.LabelMedium : $theme.typography.LabelSmall),
      color: $afterFileDrop
        ? $theme.colors.contentPrimary
        : $isDragActive
        ? $theme.colors.contentAccent
        : null,
      marginTop: $afterFileDrop ? $theme.sizing.scale100 : null,
      marginBottom: $afterFileDrop ? $theme.sizing.scale100 : null,
    } as {})
);

export const StyledContentSeparator = StyledContentMessage;

export const StyledErrorMessage = styled<StylePropsT>(
  'div',
  (props) =>
    ({
      ...props.$theme.typography.LabelMedium,
      color: props.$theme.colors.negative,
      marginTop: props.$afterFileDrop ? props.$theme.sizing.scale100 : null,
      marginBottom: props.$afterFileDrop ? props.$theme.sizing.scale100 : null,
    } as {})
);

export const StyledRoot = styled<StylePropsT>('div', (props) => ({
  ...props.$theme.typography.font300,
  color: props.$theme.colors.fileUploaderMessageColor,
}));

export const StyledHiddenInput = styled('input', {});

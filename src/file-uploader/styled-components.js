/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import {styled} from '../styles/index.js';
import type {StylePropsT} from './types.js';

export const StyledFileDragAndDrop = styled('div', (props: StylePropsT) => {
  return {
    alignItems: 'center',
    backgroundColor: props.$theme.colors.fileUploaderBackgroundColor,
    borderColor: props.$isDragActive
      ? props.$theme.colors.fileUploaderBorderColorActive
      : props.$theme.colors.fileUploaderBorderColorDefault,

    borderStyle: 'dashed',
    borderRadius: props.$theme.borders.useRoundedCorners
      ? props.$theme.borders.radius200
      : null,
    borderWidth: props.$theme.sizing.scale0,
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    outline: props.$isDisabled ? 'none' : null,
    paddingTop: props.$theme.sizing.scale900,
    paddingRight: props.$theme.sizing.scale800,
    paddingBottom: props.$theme.sizing.scale900,
    paddingLeft: props.$theme.sizing.scale800,
    width: '100%',
  };
});
StyledFileDragAndDrop.displayName = 'StyledFileDragAndDrop';

export const StyledContentMessage = styled('div', (props: StylePropsT) => ({
  ...props.$theme.typography.font450,
}));
StyledContentMessage.displayName = 'StyledContentMessage';

export const StyledContentSeparator = styled('div', (props: StylePropsT) => ({
  color: props.$theme.colors.fileUploaderSeparatorColor,
}));
StyledContentSeparator.displayName = 'StyledContentSeparator';

export const StyledRoot = styled('div', (props: StylePropsT) => ({
  ...props.$theme.typography.font450,
}));
StyledRoot.displayName = 'StyledRoot';

export const StyledFilesList = styled('ul');
StyledFilesList.displayName = 'StyledFilesList';

export const StyledHiddenInput = styled('input');
StyledHiddenInput.displayName = 'StyledHiddenInput';

export const StyledAcceptedFile = styled('li');
StyledAcceptedFile.displayName = 'StyledAcceptedFile';

export const StyledRejectedFile = styled('li', (props: StylePropsT) => ({
  color: props.$theme.colors.negative400,
}));
StyledRejectedFile.displayName = 'StyledRejectedFile';

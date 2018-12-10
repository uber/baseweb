/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

export {default as FileUploader} from './file-uploader.js';

// Styled elements
export {
  Root as StyledRoot,
  FileDragAndDrop as StyledFileDragAndDrop,
  ContentMessage as StyledContentMessage,
  ContentSeparator as StyledContentSeparator,
  FilesList as StyledFilesList,
  AcceptedFile as StyledAcceptedFile,
  RejectedFile as StyledRejectedFile,
  HiddenInput as StyledHiddenInput,
} from './styled-components.js';

// Flow
export * from './types.js';

/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import Dropzone from 'react-dropzone';

import {Block} from '../block/index.js';
import {Button, KIND} from '../button/index.js';
import {
  Root,
  FileDragAndDrop,
  ContentMessage,
  ContentSeparator,
  FilesList,
  AcceptedFile,
  RejectedFile,
  HiddenInput,
} from './styled-components.js';

import type {PropsT} from './types.js';

function prependStyleProps(styleProps) {
  return Object.keys(styleProps).reduce((nextStyleProps, currentKey) => {
    nextStyleProps[`$${currentKey}`] = styleProps[currentKey];
    return nextStyleProps;
  }, {});
}

function FileUploader(props: PropsT) {
  return (
    <Dropzone {...props}>
      {renderProps => {
        const {
          acceptedFiles,
          getRootProps,
          getInputProps,
          rejectedFiles,
          open,
          ...styleProps
        } = renderProps;

        const prefixedStyledProps = prependStyleProps({
          ...styleProps,
          isDisabled: props.disabled,
        });

        return (
          <Root>
            <FileDragAndDrop
              {...getRootProps({refKey: '$ref'})}
              {...prefixedStyledProps}
            >
              <ContentMessage {...prefixedStyledProps}>
                Drop files here to upload
              </ContentMessage>

              <ContentSeparator {...prefixedStyledProps}>or</ContentSeparator>

              <Button
                aria-controls="fileupload"
                disabled={props.disabled}
                kind={KIND.minimal}
                onClick={open}
                overrides={{BaseButton: {style: {outline: null}}}}
                role="button"
                {...prefixedStyledProps}
              >
                Browse files
              </Button>
            </FileDragAndDrop>

            <FilesList {...prefixedStyledProps}>
              {acceptedFiles.map(file => (
                <AcceptedFile key={file.name} {...prefixedStyledProps}>
                  {file.name}
                </AcceptedFile>
              ))}

              {rejectedFiles.map(file => (
                <RejectedFile key={file.name} {...prefixedStyledProps}>
                  {file.name}
                </RejectedFile>
              ))}
            </FilesList>

            <HiddenInput
              {...getInputProps({refKey: '$ref'})}
              {...prefixedStyledProps}
            />
          </Root>
        );
      }}
    </Dropzone>
  );
}

FileUploader.defaultProps = {
  disableClick: true,
};

export default FileUploader;

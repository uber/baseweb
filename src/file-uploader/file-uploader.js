/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import Dropzone from 'react-dropzone';

import {Button, KIND} from '../button/index.js';
import {getOverrides} from '../helpers/overrides.js';

import {
  StyledRoot,
  StyledFileDragAndDrop,
  StyledContentMessage,
  StyledContentSeparator,
  StyledFilesList,
  StyledAcceptedFile,
  StyledRejectedFile,
  StyledHiddenInput,
} from './styled-components.js';
import type {PropsT} from './types.js';

function prependStyleProps(styleProps) {
  return Object.keys(styleProps).reduce((nextStyleProps, currentKey) => {
    nextStyleProps[`$${currentKey}`] = styleProps[currentKey];
    return nextStyleProps;
  }, {});
}

function makeOverride(Override, Source) {
  const OverridedComponent = props => {
    const [Overrided, overrideProps] = getOverrides(Override, Source);
    return <Overrided {...props} {...overrideProps} />;
  };

  OverridedComponent.displayName = Source.displayName;
  return OverridedComponent;
}

function makeOverrides(overrides = {}) {
  return {
    Root: makeOverride(overrides.Root, StyledRoot),
    FileDragAndDrop: makeOverride(
      overrides.FileDragAndDrop,
      StyledFileDragAndDrop,
    ),
    ContentMessage: makeOverride(
      overrides.ContentMessage,
      StyledContentMessage,
    ),
    ContentSeparator: makeOverride(
      overrides.ContentSeparator,
      StyledContentSeparator,
    ),
    FilesList: makeOverride(overrides.FilesList, StyledFilesList),
    AcceptedFile: makeOverride(overrides.AcceptedFile, StyledAcceptedFile),
    RejectedFile: makeOverride(overrides.RejectedFile, StyledRejectedFile),
    HiddenInput: makeOverride(overrides.HiddenInput, StyledHiddenInput),
  };
}

function Unstable_FileUploader(props: PropsT) {
  const {
    Root,
    FileDragAndDrop,
    ContentMessage,
    ContentSeparator,
    FilesList,
    AcceptedFile,
    RejectedFile,
    HiddenInput,
  } = makeOverrides(props.overrides);

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
          <Root {...prefixedStyledProps}>
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

Unstable_FileUploader.defaultProps = {
  disableClick: true,
  overrides: {},
};

export default Unstable_FileUploader;

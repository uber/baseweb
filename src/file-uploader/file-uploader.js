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
import {ProgressBar} from '../progress-bar/index.js';

import {
  StyledRoot,
  StyledFileDragAndDrop,
  StyledContentMessage,
  StyledErrorMessage,
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
  const OverriddenComponent = props => {
    const [Overridden, overrideProps] = getOverrides(Override, Source);
    return <Overridden {...props} {...overrideProps} />;
  };

  OverriddenComponent.displayName = Source.displayName;
  return OverriddenComponent;
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
    ErrorMessage: makeOverride(overrides.ErrorMessage, StyledErrorMessage),
    HiddenInput: makeOverride(overrides.HiddenInput, StyledHiddenInput),
  };
}

function Unstable_FileUploader(props: PropsT) {
  const {
    Root,
    FileDragAndDrop,
    ContentMessage,
    ErrorMessage,
    HiddenInput,
  } = makeOverrides(props.overrides);

  const afterFileDrop = !!(
    props.progressAmount ||
    props.progressMessage ||
    props.errorMessage
  );

  return (
    <Dropzone {...props} disabled={props.disabled || afterFileDrop}>
      {renderProps => {
        const {getRootProps, getInputProps, open, ...styleProps} = renderProps;

        const prefixedStyledProps = prependStyleProps({
          ...styleProps,
          isDisabled: props.disabled,
          afterFileDrop,
        });

        return (
          <Root {...prefixedStyledProps}>
            <FileDragAndDrop
              {...getRootProps({refKey: '$ref'})}
              {...prefixedStyledProps}
            >
              {!afterFileDrop && (
                <React.Fragment>
                  <ContentMessage {...prefixedStyledProps}>
                    Drop files here to upload
                  </ContentMessage>
                  <ContentMessage {...prefixedStyledProps}>or</ContentMessage>

                  <Button
                    aria-controls="fileupload"
                    disabled={props.disabled}
                    kind={KIND.minimal}
                    onClick={open}
                    overrides={{
                      BaseButton: {
                        style: {outline: null, fontWeight: 'normal'},
                      },
                    }}
                    role="button"
                    {...prefixedStyledProps}
                  >
                    Browse files
                  </Button>
                </React.Fragment>
              )}

              {afterFileDrop && (
                <React.Fragment>
                  {!!props.progressAmount && (
                    <ProgressBar
                      value={props.progressAmount}
                      overrides={{
                        BarProgress: {
                          style: ({$theme}) => ({
                            backgroundColor: props.errorMessage
                              ? $theme.colors.negative
                              : $theme.colors.primary,
                          }),
                        },
                      }}
                    />
                  )}

                  {(props.errorMessage || props.progressMessage) &&
                  props.errorMessage ? (
                    <ErrorMessage>{props.errorMessage}</ErrorMessage>
                  ) : (
                    <ContentMessage>{props.progressMessage}</ContentMessage>
                  )}

                  {props.errorMessage ? (
                    <Button
                      kind={KIND.minimal}
                      onClick={() => {
                        props.onRetry && props.onRetry();
                      }}
                      overrides={{
                        BaseButton: {
                          style: {outline: null, fontWeight: 'normal'},
                        },
                      }}
                    >
                      Retry Upload
                    </Button>
                  ) : (
                    <Button
                      kind={KIND.minimal}
                      onClick={() => {
                        props.onCancel && props.onCancel();
                      }}
                      overrides={{
                        BaseButton: {
                          style: ({$theme}) => ({
                            outline: null,
                            fontWeight: 'normal',
                            color: $theme.colors.negative,
                          }),
                        },
                      }}
                    >
                      Cancel
                    </Button>
                  )}
                </React.Fragment>
              )}
            </FileDragAndDrop>

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

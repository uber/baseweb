/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import Dropzone from 'react-dropzone';

import {LocaleContext} from '../locale/index.js';
import {Block} from '../block/index.js';
import {Button, KIND} from '../button/index.js';
import {getOverrides} from '../helpers/overrides.js';
import {ProgressBar} from '../progress-bar/index.js';
import {Spinner} from '../spinner/index.js';

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

function FileUploader(props: PropsT) {
  const {overrides = {}} = props;

  const [Root, rootProps] = getOverrides(overrides.Root, StyledRoot);
  const [FileDragAndDrop, fileDragAndDropProps] = getOverrides(
    overrides.FileDragAndDrop,
    StyledFileDragAndDrop,
  );
  const [ContentMessage, contentMessageProps] = getOverrides(
    overrides.ContentMessage,
    StyledContentMessage,
  );
  const [ErrorMessage, errorMessageProps] = getOverrides(
    overrides.ErrorMessage,
    StyledErrorMessage,
  );
  const [HiddenInput, hiddenInputProps] = getOverrides(
    overrides.HiddenInput,
    StyledHiddenInput,
  );
  const [ButtonComponent, buttonProps] = getOverrides(
    overrides.ButtonComponent,
    Button,
  );

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

        const getRootPropsArgs: {
          onClick?: (SyntheticEvent<HTMLElement>) => void,
        } = {
          ...(props.disableClick ? {onClick: evt => evt.preventDefault()} : {}),
        };

        return (
          <LocaleContext.Consumer>
            {locale => (
              <Root
                data-baseweb="file-uploader"
                {...prefixedStyledProps}
                {...rootProps}
              >
                <FileDragAndDrop
                  {...getRootProps(getRootPropsArgs)}
                  {...prefixedStyledProps}
                  {...fileDragAndDropProps}
                >
                  {!afterFileDrop && (
                    <React.Fragment>
                      <ContentMessage
                        {...prefixedStyledProps}
                        {...contentMessageProps}
                      >
                        {locale.fileuploader.dropFilesToUpload}
                      </ContentMessage>
                      <ContentMessage
                        {...prefixedStyledProps}
                        {...contentMessageProps}
                      >
                        {locale.fileuploader.or}
                      </ContentMessage>

                      <ButtonComponent
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
                        {...buttonProps}
                      >
                        {locale.fileuploader.browseFiles}
                      </ButtonComponent>
                    </React.Fragment>
                  )}

                  {afterFileDrop && (
                    <React.Fragment>
                      {/**
                       * Below checks typeof value to ensure if progressAmount = 0 we will
                       * render the progress bar rather than the spinner. Providing a number
                       * value implies that we expect to have some progress percent in the
                       * future. We do not want to flash the spinner in this case.
                       */}
                      {typeof props.progressAmount === 'number' ? (
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
                      ) : (
                        <Block marginBottom="scale300">
                          <Spinner size={40} />
                        </Block>
                      )}
                      {(props.errorMessage || props.progressMessage) &&
                      props.errorMessage ? (
                        <ErrorMessage
                          {...prefixedStyledProps}
                          {...errorMessageProps}
                        >
                          {props.errorMessage}
                        </ErrorMessage>
                      ) : (
                        <ContentMessage
                          {...prefixedStyledProps}
                          {...contentMessageProps}
                        >
                          {props.progressMessage}
                        </ContentMessage>
                      )}
                      {props.errorMessage ? (
                        <ButtonComponent
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
                          {locale.fileuploader.retry}
                        </ButtonComponent>
                      ) : (
                        <ButtonComponent
                          kind={KIND.minimal}
                          onClick={() => {
                            props.onCancel && props.onCancel();
                          }}
                          overrides={{
                            BaseButton: {
                              style: {outline: null, fontWeight: 'normal'},
                            },
                          }}
                        >
                          {locale.fileuploader.cancel}
                        </ButtonComponent>
                      )}
                    </React.Fragment>
                  )}
                </FileDragAndDrop>

                <HiddenInput
                  {...getInputProps()}
                  {...prefixedStyledProps}
                  {...hiddenInputProps}
                />
              </Root>
            )}
          </LocaleContext.Consumer>
        );
      }}
    </Dropzone>
  );
}

FileUploader.defaultProps = {
  disableClick: true,
  overrides: {},
};

export default FileUploader;

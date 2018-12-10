/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import checkFileType from 'attr-accept';

import {Block} from '../block/index.js';
import {
  Root,
  FileDragAndDrop,
  FileSelectButton,
  HiddenInput,
} from './styled-components.js';

import StatefulContainer from './stateful-container.js';

import type {PropsT} from './types.js';

export default class FileUploader extends React.Component<PropsT, any> {
  render() {
    return (
      <StatefulContainer accept={this.props.accept} multi={this.props.multi}>
        {({
          getRootProps,
          getInputProps,
          open,
          acceptedFiles,
          rejectedFiles,
          sharedStyles,
        }) => (
          <Root>
            <FileDragAndDrop {...getRootProps()} {...sharedStyles}>
              <Block font="font450">Drop files here to upload</Block>
              <Block font="font450" color="mono600">
                or
              </Block>
              <FileSelectButton onClick={open}>Browse files</FileSelectButton>
              <HiddenInput {...getInputProps()} />
            </FileDragAndDrop>

            <Block as="ul">
              {acceptedFiles.map(file => (
                <Block as="li" key={file.name}>
                  {file.name}
                </Block>
              ))}
              {rejectedFiles.map(file => (
                <Block as="li" color="negative400" key={file.name}>
                  {file.name}
                </Block>
              ))}
            </Block>
          </Root>
        )}
      </StatefulContainer>
    );
  }
}

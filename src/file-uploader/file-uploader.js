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
  ContentContainer,
  FileDragAndDrop,
  FileSelectButton,
  Input,
} from './styled-components.js';

import type {PropsT} from './types.js';

export default class FileUploader extends React.Component<PropsT, any> {
  inputRef: {current: ?HTMLInputElement};

  constructor(props: PropsT) {
    super(props);

    this.inputRef = React.createRef();
    this.state = {isDragActive: false, acceptedFiles: [], rejectedFiles: []};
  }

  componentDidMount() {
    window.addEventListener('dragover', this.onWindowDragOverOrDrop);
    window.addEventListener('drop', this.onWindowDragOverOrDrop);
  }

  componentWillUnmount() {
    window.removeEventListener('dragover', this.onWindowDragOverOrDrop);
    window.removeEventListener('drop', this.onWindowDragOverOrDrop);
  }

  updateFiles = (files: File[], event: SyntheticEvent<HTMLElement>) => {
    if (this.props.accept) {
      let nextFiles = {acceptedFiles: [], rejectedFiles: []};
      nextFiles = files.reduce((acc, file) => {
        if (checkFileType(file, this.props.accept)) {
          acc.acceptedFiles.push(file);
        } else {
          acc.rejectedFiles.push(file);
        }
        return acc;
      }, nextFiles);

      if (this.props.onChange) {
        this.props.onChange({...nextFiles, event});
      }

      this.setState({
        acceptedFiles: [
          ...this.state.acceptedFiles,
          ...nextFiles.acceptedFiles,
        ],
        rejectedFiles: [
          ...this.state.rejectedFiles,
          ...nextFiles.rejectedFiles,
        ],
      });
    } else {
      const nextAcceptedFiles = {
        acceptedFiles: [...this.state.acceptedFiles, ...files],
      };

      if (this.props.onChange) {
        this.props.onChange({
          ...nextAcceptedFiles,
          rejectedFiles: this.state.rejectedFiles,
          event,
        });
      }

      this.setState(nextAcceptedFiles);
    }
  };

  onInputChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    // spreading files to coerce to array because type of event.target.files is a 'FileList'
    // https://github.com/facebook/flow/blob/v0.87.0/lib/dom.js#L55
    this.updateFiles([...event.target.files], event);
  };

  onClick = (event: SyntheticEvent<HTMLButtonElement>) => {
    if (!this.inputRef.current) {
      return;
    }

    this.inputRef.current.value = '';
    this.inputRef.current.click();
  };

  onDrop = (event: SyntheticDragEvent<HTMLElement>) => {
    event.preventDefault();
    this.setState({dragging: false});
    const files = event.dataTransfer ? event.dataTransfer.files : undefined;

    if (files) {
      this.updateFiles(files, event);
    }
  };

  onDragEnter = (event: SyntheticDragEvent<HTMLElement>) => {
    this.setState({isDragActive: true});
  };

  onDragLeave = (event: SyntheticDragEvent<HTMLElement>) => {
    this.setState({isDragActive: false});
  };

  onDragOver = (event: SyntheticDragEvent<HTMLElement>) => {
    event.preventDefault();
  };

  onWindowDragOverOrDrop = (event: SyntheticDragEvent<HTMLElement>) => {
    event.preventDefault();
  };

  render() {
    return (
      <Root>
        <ContentContainer>
          <FileDragAndDrop
            onDrop={this.onDrop}
            onDragEnter={this.onDragEnter}
            onDragLeave={this.onDragLeave}
            onDragOver={this.onDragOver}
            $isDragActive={this.state.isDragActive}
          >
            <Block font="font450">Drop files here to upload</Block>
            <Block font="font450" color="mono600">
              or
            </Block>
            <FileSelectButton onClick={this.onClick}>
              Browse files
            </FileSelectButton>
            <Input
              type="file"
              $ref={this.inputRef}
              onChange={this.onInputChange}
            />
          </FileDragAndDrop>
          <Block as="ul">
            {this.state.acceptedFiles.map(file => (
              <Block as="li" key={file.name}>
                {file.name}
              </Block>
            ))}
            {this.state.rejectedFiles.map(file => (
              <Block as="li" color="negative400" key={file.name}>
                {file.name}
              </Block>
            ))}
          </Block>
        </ContentContainer>
      </Root>
    );
  }
}

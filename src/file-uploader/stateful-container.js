/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import checkFileType from 'attr-accept';

class FileUploaderStatefulContainer extends React.Component<*, *> {
  inputRef: {current: ?HTMLInputElement};

  constructor(props: any) {
    super(props);

    this.inputRef = React.createRef();
    this.state = {
      acceptedFiles: [],
      rejectedFiles: [],
      isDragActive: false,
    };
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

  open = (event: SyntheticEvent<HTMLButtonElement>) => {
    if (!this.inputRef) {
      return;
    }

    this.inputRef.value = '';
    this.inputRef.click();
  };

  onDragEnter = (event: SyntheticDragEvent<HTMLElement>) => {
    console.log('enter');
    this.setState({isDragActive: true});
  };

  onDragLeave = (event: SyntheticDragEvent<HTMLElement>) => {
    this.setState({isDragActive: false});
  };

  onDragOver = (event: SyntheticDragEvent<HTMLElement>) => {
    event.preventDefault();
  };

  onDrop = (event: SyntheticDragEvent<HTMLElement>) => {
    event.preventDefault();
    this.setState({isDragActive: false});
    const files = event.dataTransfer ? event.dataTransfer.files : undefined;

    if (files) {
      this.updateFiles(files, event);
    }
  };

  onInputChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    // spreading files to coerce to array because type of event.target.files is a 'FileList'
    // https://github.com/facebook/flow/blob/v0.87.0/lib/dom.js#L55
    this.updateFiles([...event.target.files], event);
  };

  onWindowDragOverOrDrop = (event: SyntheticDragEvent<HTMLElement>) => {
    event.preventDefault();
  };

  getRootProps = ({
    onDragEnter,
    onDragLeave,
    onDragOver,
    onDrop,
    ...rest
  }: any = {}) => ({
    onDragEnter: onDragEnter || this.onDragEnter,
    onDragLeave: onDragLeave || this.onDragLeave,
    onDragOver: onDragOver || this.onDragOver,
    onDrop: onDrop || this.onDrop,
    ...rest,
  });

  getInputProps = ({onChange, refKey = '$ref', ...rest}: any = {}) => ({
    accept: this.props.accept,
    autoComplete: 'off',
    mutiple: this.props.multi,
    onChange: onChange || this.onInputChange,
    tabIndex: -1,
    type: 'file',
    [refKey]: this.setInputRef,
    ...rest,
  });

  setInputRef = (input: any) => {
    this.inputRef = input;
  };

  render() {
    return this.props.children({
      getRootProps: this.getRootProps,
      getInputProps: this.getInputProps,
      open: this.open,

      // internal state
      acceptedFiles: this.state.acceptedFiles,
      rejectedFiles: this.state.rejectedFiles,

      // style props
      sharedStyles: {
        $isDragActive: this.state.isDragActive,
      },
    });
  }
}

export default FileUploaderStatefulContainer;

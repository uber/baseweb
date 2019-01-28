/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import {mount} from 'enzyme';

import {
  Unstable_FileUploader,
  StyledContentMessage,
  StyledErrorMessage,
} from '../index.js';

describe('FileUploader', () => {
  it('applies expected accessibility attributes to button', () => {
    const wrapper = mount(<Unstable_FileUploader />);
    const button = wrapper.find('button').getDOMNode();

    expect(button.getAttribute('aria-controls')).toBe('fileupload');
    expect(button.getAttribute('role')).toBe('button');
  });

  it('renders progress bar if progressAmount provided', () => {
    const wrapper = mount(<Unstable_FileUploader progressAmount={50} />);
    const progressBar = wrapper.find('ProgressBar');
    expect(progressBar).toHaveLength(1);
  });

  it('renders content message if progressMessage provided', () => {
    const message = 'uploading...';
    const wrapper = mount(<Unstable_FileUploader progressMessage={message} />);
    const progressMessage = wrapper.find(StyledContentMessage);
    expect(progressMessage).toHaveLength(1);
    expect(progressMessage.text()).toBe(message);
  });

  it('does not render progress bar if progressAmount not provided', () => {
    const wrapper = mount(
      <Unstable_FileUploader progressMessage="uploading..." />,
    );
    const progressBar = wrapper.find('ProgressBar');
    expect(progressBar).toHaveLength(0);
  });

  it('renders error message if errorMessage provided', () => {
    const message = 'error!';
    const wrapper = mount(<Unstable_FileUploader errorMessage={message} />);
    const errorMessage = wrapper.find(StyledErrorMessage);
    expect(errorMessage).toHaveLength(1);
    expect(errorMessage.text()).toBe(message);
  });

  it('renders cancel button if progressAmount provided', () => {
    const wrapper = mount(<Unstable_FileUploader progressAmount={50} />);
    const button = wrapper.find('button');
    expect(button.text()).toBe('Cancel');
  });

  it('renders cancel button if progressMessage provided', () => {
    const wrapper = mount(
      <Unstable_FileUploader progressMessage="uploading..." />,
    );
    const button = wrapper.find('button');
    expect(button.text()).toBe('Cancel');
  });

  it('renders retry button if errorMessage provided', () => {
    const wrapper = mount(<Unstable_FileUploader errorMessage="error!" />);
    const button = wrapper.find('button');
    expect(button.text()).toBe('Retry Upload');
  });

  it('renders retry button if progressAmount and errorMessage provided', () => {
    const wrapper = mount(
      <Unstable_FileUploader progressAmount={40} errorMessage="error!" />,
    );
    const button = wrapper.find('button');
    expect(button.text()).toBe('Retry Upload');
  });

  it('renders error message if progressAmount and errorMessage provided', () => {
    const message = 'error!';
    const wrapper = mount(
      <Unstable_FileUploader progressAmount={40} errorMessage={message} />,
    );
    const errorMessage = wrapper.find(StyledErrorMessage);
    expect(errorMessage).toHaveLength(1);
    expect(errorMessage.text()).toBe(message);
  });

  it('renders retry button if progressMessage and errorMessage provided', () => {
    const wrapper = mount(
      <Unstable_FileUploader
        progressMessage="uploading..."
        errorMessage="error!"
      />,
    );
    const button = wrapper.find('button');
    expect(button.text()).toBe('Retry Upload');
  });

  it('renders error message if progressMessage and errorMessage provided', () => {
    const message = 'error!';
    const wrapper = mount(
      <Unstable_FileUploader
        progressMessage="uploading..."
        errorMessage={message}
      />,
    );
    const errorMessage = wrapper.find(StyledErrorMessage);
    expect(errorMessage).toHaveLength(1);
    expect(errorMessage.text()).toBe(message);
  });
});

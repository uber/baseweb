/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {
  render,
  getByRole,
  getByTestId,
  getByText,
  queryByRole,
  queryByTestId,
} from '@testing-library/react';

import {FileUploader} from '../index.js';

describe('FileUploader', () => {
  it('applies expected accessibility attributes to button', () => {
    const {container} = render(<FileUploader />);
    const button = container.querySelector('button');
    expect(button.getAttribute('role')).toBe('button');
  });

  it('renders progress bar if progressAmount provided', () => {
    const {container} = render(<FileUploader progressAmount={50} />);
    getByRole(container, 'progressbar');
  });

  it('renders content message if progressMessage provided', () => {
    const message = 'uploading...';
    const {container} = render(<FileUploader progressMessage={message} />);
    getByText(container, message);
  });

  it('renders spinner if progressMessage provided', () => {
    const {container} = render(
      <FileUploader
        progressMessage="uploading..."
        overrides={{Spinner: {props: {'data-testid': 'spinner'}}}}
      />,
    );
    getByTestId(container, 'spinner');
  });

  it('does not render spinner if progressAmount is zero, render progress bar', () => {
    const {container} = render(
      <FileUploader
        progressMessage="uploading..."
        progressAmount={0}
        overrides={{Spinner: {props: {'data-testid': 'spinner'}}}}
      />,
    );
    const spinner = queryByTestId(container, 'spinner');
    expect(spinner).toBeNull();

    getByRole(container, 'progressbar');
  });

  it('does not render progress bar if progressAmount not provided', () => {
    const {container} = render(<FileUploader progressMessage="uploading..." />);
    expect(queryByRole(container, 'progressbar')).toBeNull();
  });

  it('renders error message if errorMessage provided', () => {
    const message = 'error!';
    const {container} = render(<FileUploader errorMessage={message} />);
    getByText(container, message);
  });

  it('renders cancel button if progressAmount provided', () => {
    const {container} = render(<FileUploader progressAmount={50} />);
    getByText(container, 'Cancel');
  });

  it('renders cancel button if progressMessage provided', () => {
    const {container} = render(<FileUploader progressMessage="uploading..." />);
    getByText(container, 'Cancel');
  });

  it('renders retry button if errorMessage provided', () => {
    const {container} = render(<FileUploader errorMessage="error!" />);
    getByText(container, 'Retry Upload');
  });

  it('renders retry button if progressAmount and errorMessage provided', () => {
    const {container} = render(
      <FileUploader progressAmount={40} errorMessage="error!" />,
    );
    getByText(container, 'Retry Upload');
  });

  it('renders error message if progressAmount and errorMessage provided', () => {
    const message = 'error!';
    const {container} = render(
      <FileUploader progressAmount={40} errorMessage={message} />,
    );
    getByText(container, message);
  });

  it('renders retry button if progressMessage and errorMessage provided', () => {
    const {container} = render(
      <FileUploader progressMessage="uploading..." errorMessage="error!" />,
    );
    getByText(container, 'Retry Upload');
  });

  it('renders error message if progressMessage and errorMessage provided', () => {
    const message = 'error!';
    const {container} = render(
      <FileUploader progressMessage="uploading..." errorMessage={message} />,
    );
    getByText(container, message);
  });
});

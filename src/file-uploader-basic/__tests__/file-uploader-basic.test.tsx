/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import {
  act,
  render,
  getByRole,
  getByTestId,
  getByText,
  queryByTestId,
  queryAllByRole,
  fireEvent,
  waitFor,
} from '@testing-library/react';

import { FileUploaderBasic } from '..';
import locale from '../locale';
import Upload from '../../icon/upload';

describe('FileUploaderBasic', () => {
  it('renders progress bar if progressAmount provided', () => {
    const { container } = render(<FileUploaderBasic progressAmount={50} />);
    getByRole(container, 'progressbar');
  });

  it('renders content message if progressMessage provided', () => {
    const message = 'uploading...';
    const { container } = render(<FileUploaderBasic progressMessage={message} />);
    getByText(container, message);
  });

  it('renders spinner if progressMessage provided', () => {
    const { container } = render(
      <FileUploaderBasic
        progressMessage="uploading..."
        overrides={{ Spinner: { props: { 'data-testid': 'spinner' } } }}
      />
    );
    getByTestId(container, 'spinner');
  });

  it('does not render spinner if progressAmount is zero, render progress bar', () => {
    const { container } = render(
      <FileUploaderBasic
        progressMessage="uploading..."
        progressAmount={0}
        overrides={{ Spinner: { props: { 'data-testid': 'spinner' } } }}
      />
    );
    const spinner = queryByTestId(container, 'spinner');
    expect(spinner).toBeNull();

    getByRole(container, 'progressbar');
  });

  it('does not render progress bar if progressAmount not provided', () => {
    const { container } = render(<FileUploaderBasic progressMessage="uploading..." />);
    //will render indeterminate spinner with role progress bar instead
    expect(queryAllByRole(container, 'progressbar')).toHaveLength(1);
  });

  it('renders error message if errorMessage provided', () => {
    const message = 'error!';
    const { container } = render(<FileUploaderBasic errorMessage={message} />);
    getByText(container, message);
  });

  it('renders cancel button if progressAmount provided', () => {
    const { container } = render(<FileUploaderBasic progressAmount={50} />);
    getByText(container, 'Cancel');
  });

  it('renders cancel button if progressMessage provided', () => {
    const { container } = render(<FileUploaderBasic progressMessage="uploading..." />);
    getByText(container, 'Cancel');
  });

  it('renders retry button if errorMessage provided', () => {
    const { container } = render(<FileUploaderBasic errorMessage="error!" />);
    getByText(container, 'Retry Upload');
  });

  it('renders retry button if progressAmount and errorMessage provided', () => {
    const { container } = render(<FileUploaderBasic progressAmount={40} errorMessage="error!" />);
    getByText(container, 'Retry Upload');
  });

  it('renders error message if progressAmount and errorMessage provided', () => {
    const message = 'error!';
    const { container } = render(<FileUploaderBasic progressAmount={40} errorMessage={message} />);
    getByText(container, message);
  });

  it('renders retry button if progressMessage and errorMessage provided', () => {
    const { container } = render(
      <FileUploaderBasic progressMessage="uploading..." errorMessage="error!" />
    );
    getByText(container, 'Retry Upload');
  });

  it('renders error message if progressMessage and errorMessage provided', () => {
    const message = 'error!';
    const { container } = render(
      <FileUploaderBasic progressMessage="uploading..." errorMessage={message} />
    );
    getByText(container, message);
  });

  it('calls onRetry if errorMessage provided and retry button is clicked', async () => {
    const message = 'error!';
    const onRetry = jest.fn();
    const { container } = render(<FileUploaderBasic errorMessage={message} onRetry={onRetry} />);
    await act(() => {
      fireEvent.click(getByText(container, 'Retry Upload'));
    });
    await waitFor(() => {
      expect(onRetry).toHaveBeenCalledTimes(1);
    });
  });

  it('calls onCancel if progressMessage provided and cancel button clicked', async () => {
    const message = 'progress!';
    const onCancel = jest.fn();
    const { container } = render(
      <FileUploaderBasic progressMessage={message} onCancel={onCancel} />
    );
    await act(() => {
      fireEvent.click(getByText(container, 'Cancel'));
    });
    await waitFor(() => {
      expect(onCancel).toHaveBeenCalledTimes(1);
    });
  });

  it('renders accept attribute as a string when inputted as an array', () => {
    const { container } = render(<FileUploaderBasic accept={['test-1', 'test-2']} />);
    expect(container.querySelector('input')?.getAttribute('accept')).toBe('test-1,test-2');
  });

  it('renders accept attribute as a string when inputted as a string', () => {
    const { container } = render(<FileUploaderBasic accept={'test-1,test-2'} />);
    expect(container.querySelector('input')?.getAttribute('accept')).toBe('test-1,test-2');
  });

  it('renders button text and message when swapped', () => {
    const { container } = render(<FileUploaderBasic swapButtonAndMessage />);
    getByText(container, locale.browseFiles);
    getByText(container, locale.dropFilesToUpload);
  });

  it('renders alternate button text and message', () => {
    const { container } = render(
      <FileUploaderBasic buttonText="Test buttonText" contentMessage="Test contentMessage" />
    );
    getByText(container, 'Test buttonText');
    getByText(container, 'Test contentMessage');
  });

  it('renders button icon', () => {
    const { container } = render(
      <FileUploaderBasic
        buttonIcon={() => (
          <Upload
            overrides={{
              Svg: {
                props: { 'data-testid': 'upload-icon' },
              },
            }}
          />
        )}
        contentMessage="Test contentMessage"
      />
    );
    getByTestId(container, 'upload-icon');
  });
});

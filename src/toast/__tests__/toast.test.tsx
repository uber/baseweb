/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import {
  render,
  fireEvent,
  getByTestId,
  getByRole,
  queryByTestId,
  waitForElementToBeRemoved,
} from '@testing-library/react';

import { Toast } from '..';

describe('Toast', () => {
  it('basic toast functionality', () => {
    const { container } = render(<Toast>content</Toast>);
    getByRole(container, 'alert');
  });

  it('handles close click', async () => {
    const onClose = jest.fn();
    const { container } = render(
      <Toast onClose={onClose} overrides={{ CloseIcon: { props: { 'data-testid': 'close' } } }}>
        content
      </Toast>
    );
    const icon = getByTestId(container, 'close');
    fireEvent.click(icon);
    await waitForElementToBeRemoved(() => getByRole(container, 'alert'));
    expect(onClose).toHaveBeenCalled();
  });

  it('handles non-closable', () => {
    const onClose = jest.fn();
    const { container } = render(
      <Toast
        closeable={false}
        onClose={onClose}
        overrides={{ CloseIcon: { props: { 'data-testid': 'close' } } }}
      >
        content
      </Toast>
    );
    const icon = queryByTestId(container, 'close');
    expect(icon).toBeNull();
  });

  it('has default aria role of alert and no aria-live=assertive', () => {
    const onClose = jest.fn();
    const { container } = render(<Toast onClose={onClose}>content</Toast>);
    const toast = container.querySelector('div');
    expect(toast?.getAttribute('role')).toBe('alert');
    expect(toast?.getAttribute('aria-live')).toBe(null);
  });

  it('has given aria role of alert and no aria-live ', () => {
    const onClose = jest.fn();
    const { container } = render(
      <Toast onClose={onClose} role="alert">
        content
      </Toast>
    );
    const toast = container.querySelector('div');
    expect(toast?.getAttribute('role')).toBe('alert');
    expect(toast?.getAttribute('aria-live')).toBe(null);
  });

  it('has aria role of status and redundant aria-live=polite', () => {
    const onClose = jest.fn();
    const { container } = render(
      <Toast onClose={onClose} role="status">
        content
      </Toast>
    );
    const toast = getByRole(container, 'status');
    expect(toast?.getAttribute('aria-live')).toBe('polite');
  });

  it('has aria role of log and redundant  aria-live=polite', () => {
    const onClose = jest.fn();
    const { container } = render(
      <Toast onClose={onClose} role="log">
        content
      </Toast>
    );
    const toast = getByRole(container, 'log');
    expect(toast?.getAttribute('aria-live')).toBe('polite');
  });

  it('has default role=alertdialog when it has closebutton with autofocus ', () => {
    const onClose = jest.fn();
    const { container } = render(
      <Toast onClose={onClose} autoFocus={true}>
        content
      </Toast>
    );
    const toast = getByRole(container, 'alertdialog');
    expect(toast?.getAttribute('role')).toBe('alertdialog');
    expect(toast?.getAttribute('aria-live')).toBe('assertive');
  });

  it('has given role=alertdialog and has appropriate arialive ', () => {
    const onClose = jest.fn();
    const { container } = render(
      <Toast onClose={onClose} role="alertdialog">
        content
      </Toast>
    );
    const toast = getByRole(container, 'alertdialog');
    expect(toast?.getAttribute('aria-live')).toBe('assertive');
  });
});

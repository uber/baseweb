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

import { Toast } from '../index';

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
});

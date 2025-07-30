/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Dialog, CLOSE_SOURCE } from '..';
import { TestBaseProvider } from '../../test/test-utils';

describe('Dialog - Dismiss', () => {
  test('dismiss on backdrop', async () => {
    const onDismissFn = jest.fn();
    render(
      <TestBaseProvider>
        <Dialog heading="Foo" isOpen={true} onDismiss={onDismissFn} />
      </TestBaseProvider>
    );
    userEvent.click(document.body);
    await waitFor(() => {
      expect(onDismissFn).toHaveBeenCalledWith({ closeSource: CLOSE_SOURCE.backdrop });
    });
  });

  test('dismiss on dismiss button', async () => {
    const onDismissFn = jest.fn();
    render(
      <TestBaseProvider>
        <Dialog heading="Foo" isOpen={true} onDismiss={onDismissFn} showDismissButton />
      </TestBaseProvider>
    );
    userEvent.click(screen.getByRole('button', { name: 'Delete' }));
    await waitFor(() => {
      expect(onDismissFn).toHaveBeenCalledWith({ closeSource: CLOSE_SOURCE.dismissButton });
    });
  });

  test('dismiss on escape', async () => {
    const onDismissFn = jest.fn();
    render(
      <TestBaseProvider>
        <Dialog heading="Foo" isOpen={true} onDismiss={onDismissFn} />
      </TestBaseProvider>
    );
    // userEvent doesn't work somehow
    // userEvent.keyboard('{esc}');
    fireEvent.keyUp(screen.getByText('Foo'), { key: 'Escape' });
    await waitFor(() => {
      expect(onDismissFn).toHaveBeenCalledWith({ closeSource: CLOSE_SOURCE.escape });
    });
  });
});

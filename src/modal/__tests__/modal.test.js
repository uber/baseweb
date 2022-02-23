/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
/* eslint-env browser */

import * as React from 'react';
import { render, fireEvent, getByTestId, getByText, queryByText } from '@testing-library/react';

import { StatefulSelect } from '../../select/index.js';
import { TestBaseProvider } from '../../test/test-utils.js';

import { Modal, ModalBody, CLOSE_SOURCE } from '../index.js';

describe('Modal', () => {
  it('renders nothing when closed', () => {
    const content = 'hello world';
    const { container } = render(
      <TestBaseProvider>
        <Modal isOpen={false}>
          <ModalBody>{content}</ModalBody>
        </Modal>
      </TestBaseProvider>
    );
    expect(queryByText(container, content)).toBeNull();
  });

  it('close button triggers close', () => {
    const onClose = jest.fn();
    const { container } = render(
      <TestBaseProvider>
        <Modal isOpen onClose={onClose}>
          <ModalBody>Modal Body</ModalBody>
        </Modal>
      </TestBaseProvider>
    );
    const button = container.querySelector('button');
    if (button) fireEvent.click(button);
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenLastCalledWith({
      closeSource: CLOSE_SOURCE.closeButton,
    });
  });

  it('disables close', () => {
    const consoleWarn = console.warn;
    // $FlowFixMe
    console.warn = jest.fn();

    const { container } = render(
      <TestBaseProvider>
        <Modal isOpen closeable={false}>
          <ModalBody>Modal Body</ModalBody>
        </Modal>
      </TestBaseProvider>
    );

    expect(container.querySelectorAll('button').length).toBe(0);
  });

  it('override components', () => {
    const consoleWarn = console.warn;
    // $FlowFixMe
    console.warn = jest.fn();

    const { container } = render(
      <TestBaseProvider>
        <Modal
          isOpen
          overrides={{
            Root: { props: { 'data-testid': 'root' } },
            Backdrop: { props: { 'data-testid': 'backdrop' } },
            DialogContainer: { props: { 'data-testid': 'dialog-container' } },
            Dialog: { props: { 'data-testid': 'dialog' } },
            Close: { props: { 'data-testid': 'close' } },
          }}
        >
          <ModalBody>Modal Body</ModalBody>
        </Modal>
      </TestBaseProvider>
    );

    getByTestId(container, 'root');
    getByTestId(container, 'dialog-container');
    getByTestId(container, 'dialog');
    getByTestId(container, 'close');
  });

  it('role', () => {
    const consoleWarn = console.warn;
    // $FlowFixMe
    console.warn = jest.fn();

    const { container } = render(
      <TestBaseProvider>
        {/* eslint-disable-next-line jsx-a11y/aria-role */}
        <Modal role="mycustomrole" isOpen>
          <ModalBody>Modal Body</ModalBody>
        </Modal>
      </TestBaseProvider>
    );

    const dialog = container.querySelector('[role="mycustomrole"]');
    expect(dialog).not.toBeNull();
  });

  it('raises no errors when operating on select in modal', () => {
    const { container } = render(
      <TestBaseProvider>
        <Modal isOpen>
          <StatefulSelect
            options={[
              { id: 'AliceBlue', color: '#F0F8FF' },
              { id: 'AntiqueWhite', color: '#FAEBD7' },
              { id: 'Aqua', color: '#00FFFF' },
              { id: 'Aquamarine', color: '#7FFFD4' },
              { id: 'Azure', color: '#F0FFFF' },
              { id: 'Beige', color: '#F5F5DC' },
            ]}
            overrides={{ ValueContainer: { props: { 'data-testid': 'selected' } } }}
            labelKey="id"
            valueKey="color"
          />
        </Modal>
      </TestBaseProvider>
    );
    const input = container.querySelector('input');
    if (input) fireEvent.click(input);
    fireEvent.click(getByText(container, 'AliceBlue'));
    expect(getByTestId(container, 'selected').textContent).toBe('AliceBlue');
  });
});

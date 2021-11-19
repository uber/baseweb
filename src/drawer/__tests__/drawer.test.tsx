/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-env browser */

import * as React from 'react';
import { render, fireEvent, getByTestId, queryByText } from '@testing-library/react';
import { Drawer, CLOSE_SOURCE } from '..';

jest.mock('../../layer/index', () => {
  return {
    Layer: jest.fn().mockImplementation((props) => {
      return props.children;
    }),
  };
});

describe('Drawer', () => {
  it('renders nothing when closed', () => {
    const { container } = render(
      <Drawer isOpen={false} anchor="right">
        Hello world
      </Drawer>
    );
    const text = queryByText(container, 'Hello world');
    expect(text).toBeNull();
  });

  it('renders content when open', () => {
    const { container } = render(
      <Drawer isOpen anchor="right">
        Hello world
      </Drawer>
    );
    const text = queryByText(container, 'Hello world');
    expect(text).not.toBeNull();
  });

  it('renders backdrop with opacity 0 when showBackdrop is false', () => {
    const { container } = render(
      <Drawer
        isOpen
        anchor="right"
        showBackdrop={false}
        overrides={{ Backdrop: { props: { 'data-testid': 'backdrop' } } }}
      >
        Hello world
      </Drawer>
    );
    const backdrop = getByTestId(container, 'backdrop');
    expect(backdrop).not.toBeNull();
  });

  it('hides content when close button clicked', () => {
    const onClose = jest.fn();
    const { container } = render(
      <Drawer isOpen onClose={onClose} anchor="right">
        Drawer Body
      </Drawer>
    );
    const button = container.querySelector('button');
    if (button) fireEvent.click(button);
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenLastCalledWith({
      closeSource: CLOSE_SOURCE.closeButton,
    });
  });

  it('hides content on backdrop click', () => {
    const onClose = jest.fn();
    const { container } = render(
      <Drawer
        isOpen
        onClose={onClose}
        anchor="right"
        overrides={{ Backdrop: { props: { 'data-testid': 'backdrop' } } }}
      >
        Drawer Body
      </Drawer>
    );
    fireEvent.click(getByTestId(container, 'backdrop'));
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenLastCalledWith({
      closeSource: CLOSE_SOURCE.backdrop,
    });
  });

  it('disables close feature', () => {
    const onClose = jest.fn();
    const { container } = render(
      <Drawer
        isOpen
        closeable={false}
        onClose={onClose}
        overrides={{ Backdrop: { props: { 'data-testid': 'backdrop' } } }}
      >
        Drawer Body
      </Drawer>
    );
    expect(queryByText(container, 'Drawer Body')).not.toBeNull();
    expect(container.querySelector('button')).toBeNull();

    fireEvent.click(getByTestId(container, 'backdrop'));
    expect(queryByText(container, 'Drawer Body')).not.toBeNull();
  });

  it('override components', () => {
    const { container } = render(
      <Drawer
        isOpen
        overrides={{
          Root: { props: { 'data-testid': 'root' } },
          Backdrop: { props: { 'data-testid': 'backdrop' } },
          DrawerContainer: { props: { 'data-testid': 'drawer-container' } },
          DrawerBody: { props: { 'data-testid': 'drawer-body' } },
          Close: { props: { 'data-testid': 'close' } },
        }}
      >
        Drawer Body
      </Drawer>
    );

    getByTestId(container, 'root');
    getByTestId(container, 'backdrop');
    getByTestId(container, 'drawer-container');
    getByTestId(container, 'drawer-body');
    getByTestId(container, 'close');
  });
});

/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* global window */
// @flow

import React from 'react';
import {render, getByText} from '@testing-library/react';

import {SnackbarElement} from '../index.js';

describe('snackbar-element', () => {
  it('renders text content', () => {
    const resizeObserver = window.ResizeObserver;
    window.ResizeObserver = jest.fn(() => ({
      observe() {},
      unobserve() {},
      disconnect() {},
    }));

    const {container} = render(
      <SnackbarElement focus={false} message="message" />,
    );
    const message = getByText(container, 'message');
    expect(message).not.toBeNull();

    window.ResizeObserver = resizeObserver;
  });
});

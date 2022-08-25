/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import React from 'react';
import { render, getByText } from '@testing-library/react';

import { SnackbarElement } from '..';

describe('snackbar-element', () => {
  it('renders text content', () => {
    const { container } = render(<SnackbarElement focus={false} message="message" />);
    const message = getByText(container, 'message');
    expect(message).not.toBeNull();
  });
});

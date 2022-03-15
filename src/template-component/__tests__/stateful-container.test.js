/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import { render } from '@testing-library/react';
import { StatefulContainer } from '../index.js';

describe('StatefulComponentContainer', () => {
  test('provides expected arguments to children fn', () => {
    const children = jest.fn(() => null);
    render(<StatefulContainer>{children}</StatefulContainer>);
    expect(children).toHaveBeenCalledTimes(1);
    expect(children.mock.calls[0][0]).toHaveProperty('prop', true);
    expect(children.mock.calls[0][0]).toHaveProperty('onClick');
  });
});

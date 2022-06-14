/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { render } from '@testing-library/react';

import { StatefulContainer } from '..';

describe('Stateful container', function () {
  it('passes additional props to children', () => {
    const children = jest.fn((arg) => null);
    // @ts-expect-error undeclared property
    render(<StatefulContainer foo="bar">{children}</StatefulContainer>);
    expect(children.mock.calls[0][0]).toHaveProperty('foo', 'bar');
  });

  it('passes intial state to children', () => {
    const children = jest.fn((arg) => null);
    render(<StatefulContainer initialState={{ value: 'x' }}>{children}</StatefulContainer>);
    expect(children.mock.calls[0][0]).toHaveProperty('value', 'x');
  });
});

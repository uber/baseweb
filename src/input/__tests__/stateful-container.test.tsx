/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { act } from 'react-dom/test-utils';
import { render } from '@testing-library/react';
import { StatefulContainer } from '..';

describe('stateful-container', () => {
  it('renders children fn', () => {
    const children = jest.fn(() => null);
    render(<StatefulContainer>{children}</StatefulContainer>);
    expect(children).toHaveBeenCalledTimes(1);
  });

  it('provides onChange handler to children fn', () => {
    const onChange = jest.fn();
    const children = jest.fn((props) => null);
    render(<StatefulContainer onChange={onChange}>{children}</StatefulContainer>);
    act(() => children.mock.calls[0][0].onChange({ target: { value: 'a' } }));
    expect(onChange).toBeCalledTimes(1);
  });
});

/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { render, fireEvent, getByText } from '@testing-library/react';

import { Input } from '../index';

describe('input', () => {
  it('renders input element', () => {
    const { container } = render(<Input />);
    const input = container.querySelector('input');
    expect(input).not.toBeNull();
  });

  it('calls provided event handlers', () => {
    const onFocus = jest.fn();
    const onBlur = jest.fn();
    const onChange = jest.fn();
    const onKeyDown = jest.fn();
    const onKeyUp = jest.fn();

    const { container } = render(
      <Input
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
      />
    );

    const input = container.querySelector('input');

    if (input) fireEvent.focus(input);
    expect(onFocus).toBeCalledTimes(1);

    if (input) fireEvent.blur(input);
    expect(onBlur).toBeCalledTimes(1);

    if (input) fireEvent.change(input, { target: { value: 'a' } });
    expect(onChange).toBeCalledTimes(1);

    if (input) fireEvent.keyDown(input, { key: 'A', code: 'KeyA' });
    expect(onKeyDown).toBeCalledTimes(1);

    if (input) fireEvent.keyUp(input, { key: 'A', code: 'KeyA' });
    expect(onKeyUp).toBeCalledTimes(1);
  });

  it('renders enhancers', () => {
    const { container } = render(<Input startEnhancer="start" endEnhancer="end" />);
    expect(getByText(container, 'start')).toBeDefined();
    expect(getByText(container, 'end')).toBeDefined();
  });

  it('applies useRef ref', () => {
    const Component = () => {
      const ref = React.useRef<HTMLInputElement | null>(null);
      return <Input inputRef={ref} startEnhancer="start" />;
    };
    const { container } = render(<Component />);
    expect(getByText(container, 'start')).toBeDefined();
  });

  it('applies createRef ref', () => {
    const Component = () => {
      const ref = React.createRef<HTMLInputElement>();
      return <Input inputRef={ref} startEnhancer="start" />;
    };
    const { container } = render(<Component />);
    expect(getByText(container, 'start')).toBeDefined();
  });
});

/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {render, fireEvent} from '@testing-library/react';

import {BaseInput} from '../index.js';

describe('base-input', () => {
  it('basic render', () => {
    // $FlowFixMe
    const {container} = render(<BaseInput />);
    expect(container.querySelector('input')).not.toBeNull();
  });

  it('calls provided event handlers', () => {
    const onFocus = jest.fn();
    const onBlur = jest.fn();
    const onChange = jest.fn();
    const onKeyDown = jest.fn();
    const onKeyUp = jest.fn();

    const {container} = render(
      // $FlowFixMe
      <BaseInput
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
      />,
    );

    const input = container.querySelector('input');

    fireEvent.focus(input);
    expect(onFocus).toBeCalledTimes(1);

    fireEvent.blur(input);
    expect(onBlur).toBeCalledTimes(1);

    fireEvent.change(input, {target: {value: 'a'}});
    expect(onChange).toBeCalledTimes(1);

    fireEvent.keyDown(input, {key: 'A', code: 'KeyA'});
    expect(onKeyDown).toBeCalledTimes(1);

    fireEvent.keyUp(input, {key: 'A', code: 'KeyA'});
    expect(onKeyUp).toBeCalledTimes(1);
  });

  it('BaseInput - should not take default value prop', () => {
    // $FlowFixMe
    const {container} = render(<BaseInput />);
    // Guard against passing default value prop
    expect(container.querySelector('input').value).toBe('');
  });

  it('calls focus handler when autoFocus is true', () => {
    const onFocus = jest.fn();
    render(
      // $FlowFixMe
      <BaseInput autoFocus onFocus={onFocus} />,
    );
    expect(onFocus).toBeCalledTimes(1);
  });

  it('applies ref from inputRef prop', () => {
    const onFocus = jest.fn();
    function TestCase() {
      const ref = React.useRef();
      React.useEffect(() => {
        if (ref.current) {
          ref.current.focus();
        }
      }, []);
      // $FlowFixMe
      return <BaseInput inputRef={ref} onFocus={onFocus} />;
    }

    render(<TestCase />);
    expect(onFocus).toBeCalledTimes(1);
  });

  it('applies expected autocomplete attribute if type is password', () => {
    // $FlowFixMe
    const {container} = render(<BaseInput type="password" />);
    const input = container.querySelector('input');
    expect(input.getAttribute('autocomplete')).toBe('new-password');
  });

  it('applies provided autocomplete attribute', () => {
    const autocomplete = 'current-password';
    const {container} = render(
      // $FlowFixMe
      <BaseInput autoComplete={autocomplete} type="password" />,
    );
    const input = container.querySelector('input');
    expect(input.getAttribute('autocomplete')).toBe(autocomplete);
  });
});

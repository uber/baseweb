/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {render, fireEvent} from '@testing-library/react';

import {MaskedInput} from '../index.js';

describe('masked-input', () => {
  it('renders input element', () => {
    const {container} = render(
      <MaskedInput value="(123) 456-7890" mask="(999) 999-9999" />,
    );
    const input = container.querySelector('input');
    expect(input).not.toBeNull();
  });

  it('calls provided event handlers', () => {
    const onFocus = jest.fn();
    const onBlur = jest.fn();
    const onChange = jest.fn();
    const onKeyDown = jest.fn();
    const onKeyUp = jest.fn();

    const {container} = render(
      <MaskedInput
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
});

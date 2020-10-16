/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* global document */
// @flow
import * as React from 'react';
import {render, fireEvent} from '@testing-library/react';

import Textarea from '../textarea.js';

describe('Textarea', () => {
  it('Basic functionality', () => {
    const props = {
      value: 'textarea value',
      placeholder: 'Placeholder',
      onFocus: jest.fn(),
      onBlur: jest.fn(),
      onChange: jest.fn(),
    };

    const {container} = render(<Textarea {...props} />);

    const textarea = container.querySelector('textarea');
    expect(textarea).not.toBeNull();

    expect(textarea.value).toBe(props.value);
    expect(textarea.placeholder).toBe(props.placeholder);

    fireEvent.focus(textarea);
    expect(props.onFocus).toHaveBeenCalled();

    fireEvent.blur(textarea);
    expect(props.onBlur).toHaveBeenCalled();

    fireEvent.change(textarea, {target: {value: 'a'}});
    expect(props.onChange).toHaveBeenCalled();
  });

  it('autoFocus sets the initial focus state', () => {
    const props = {
      autoFocus: true,
      onChange: jest.fn(),
    };

    const {container} = render(<Textarea {...props} />);
    const textarea = container.querySelector('textarea');
    expect(document.activeElement).toBe(textarea);
  });
});

/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
/* eslint-env node */
import * as React from 'react';
import {
  render,
  fireEvent,
  getByTestId,
  getByText,
} from '@testing-library/react';

import {Radio} from '../index.js';

describe('Radio', () => {
  it('calls provided handlers', () => {
    const spy = jest.fn();

    const {container} = render(
      <Radio
        onBlur={spy}
        onChange={spy}
        onFocus={spy}
        onMouseEnter={spy}
        onMouseLeave={spy}
        onMouseDown={spy}
        onMouseUp={spy}
        overrides={{Root: {props: {'data-testid': 'root'}}}}
      />,
    );

    const input = container.querySelector('input');
    fireEvent.blur(input);
    fireEvent.focus(input);
    expect(spy).toHaveBeenCalledTimes(2);

    spy.mockClear();

    const root = getByTestId(container, 'root');
    fireEvent.mouseEnter(root);
    fireEvent.mouseLeave(root);
    fireEvent.mouseDown(root);
    fireEvent.mouseUp(root);
    expect(spy).toHaveBeenCalledTimes(4);
  });

  it('displays description if provided', () => {
    const description = 'foo';
    const {container} = render(<Radio description={description}>bar</Radio>);
    getByText(container, description);
  });
});

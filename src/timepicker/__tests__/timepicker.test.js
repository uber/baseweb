/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import {render, fireEvent} from '@testing-library/react';

import {TimePicker} from '../index.js';

const TIME = new Date(2019, 3, 19, 1, 30);
const overrides = {
  Select: {
    props: {overrides: {ValueContainer: {props: {'data-id': 'selected'}}}},
  },
};

describe('TimePicker', () => {
  it('setting value to null renders input placeholder', () => {
    function Case() {
      const [value, setValue] = React.useState(TIME);
      return (
        <div>
          <TimePicker
            value={value}
            onChange={setValue}
            nullable
            overrides={overrides}
            placeholder="placeholder"
          />
          <button onClick={() => setValue(null)}>clear</button>
        </div>
      );
    }

    const {container} = render(<Case />);
    const before = container.querySelector('[data-id="selected"]');
    expect(before.textContent).toBe('1:30 AM');

    const button = container.querySelector('button');
    fireEvent.click(button);

    const after = container.querySelector('[data-id="selected"]');
    expect(after.textContent).toBe('placeholder');
  });
});

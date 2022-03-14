/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {render, fireEvent} from '@testing-library/react';

import {Component} from '../index.js';

describe('Component', () => {
  it('calls onClick handler when clicked', () => {
    const onClick = jest.fn();
    const {container} = render(<Component onClick={onClick}>test</Component>);
    const button = container.querySelector('button');
    if (button) fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

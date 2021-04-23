/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {render, fireEvent, getByText} from '@testing-library/react';

import {Panel} from '../index.js';

describe('Panel', () => {
  it('applies aria-controls when provided', () => {
    const {container} = render(
      <Panel aria-controls="panel" title="title">
        content
      </Panel>,
    );
    const panel = container.querySelector('[aria-controls="panel"]');
    expect(panel).not.toBeNull();
  });

  it('calls onChange on enter key press', () => {
    const onChange = jest.fn();
    const {container} = render(
      <Panel onChange={onChange} title="title">
        content
      </Panel>,
    );

    const header = getByText(container, 'title');
    fireEvent.keyDown(header, {keyCode: 13});

    expect(onChange.mock.calls.length).toBe(1);
  });

  it('calls onChange on space key press', () => {
    const onChange = jest.fn();
    const {container} = render(
      <Panel onChange={onChange} title="title">
        content
      </Panel>,
    );

    const panel = getByText(container, 'title');
    fireEvent.keyDown(panel, {keyCode: 32});
    expect(onChange.mock.calls.length).toBe(1);
  });

  it('calls onChange on click', () => {
    const onChange = jest.fn();
    const {container} = render(
      <Panel onChange={onChange} title="title">
        content
      </Panel>,
    );

    const panel = getByText(container, 'title');
    fireEvent.click(panel);
    expect(onChange.mock.calls.length).toBe(1);
  });
});

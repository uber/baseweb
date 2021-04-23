/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {render, fireEvent} from '@testing-library/react';

import {Button} from '../../button/index.js';

import {ButtonGroup} from '../index.js';

function buildSimpleWrapper(props = {}) {
  return render(
    <ButtonGroup {...props}>
      <Button />
      <Button />
      <Button />
    </ButtonGroup>,
  );
}

describe('ButtonGroup', () => {
  it('click event on child element triggers parent handler', () => {
    const handler = jest.fn();
    const {container} = buildSimpleWrapper({onClick: handler});
    const buttons = container.querySelectorAll('button');
    for (let button of buttons) {
      fireEvent.click(button);
    }
    expect(handler.mock.calls.length).toBe(3);
  });

  it('does not clobber click handler on child element', () => {
    const parentHandler = jest.fn();
    const childHandler = jest.fn();
    const {container} = render(
      <ButtonGroup onClick={parentHandler}>
        <Button onClick={childHandler} />
        <Button />
      </ButtonGroup>,
    );

    const [first, second] = container.querySelectorAll('button');

    fireEvent.click(first);
    expect(parentHandler).toHaveBeenCalledTimes(1);
    expect(childHandler).toHaveBeenCalledTimes(1);

    fireEvent.click(second);
    expect(parentHandler).toHaveBeenCalledTimes(2);
    expect(childHandler).toHaveBeenCalledTimes(1);
  });

  it('if disabled, click events do not call provided handler', () => {
    const handler = jest.fn();
    const {container} = buildSimpleWrapper({disabled: true, onClick: handler});
    fireEvent.click(container.querySelector('button'));
    expect(handler).toHaveBeenCalledTimes(0);
  });

  it('sets no children as selected if selected prop is null value', () => {
    const {container} = buildSimpleWrapper({selected: null});
    const buttons = container.querySelectorAll('button');
    for (let button of buttons) {
      expect(button.getAttribute('aria-checked')).toBe('false');
    }
  });

  it('sets no children as selected if selected prop is empty array', () => {
    const {container} = buildSimpleWrapper({selected: []});
    const buttons = container.querySelectorAll('button');
    for (let button of buttons) {
      expect(button.getAttribute('aria-checked')).toBe('false');
    }
  });

  it('sets appropriate child as selected if selected prop is a number', () => {
    const selectedIndex = 2;
    const {container} = buildSimpleWrapper({selected: selectedIndex});
    const buttons = container.querySelectorAll('button');
    for (let i = 0; i < buttons.length; i++) {
      const button = buttons[i];
      expect(button.getAttribute('aria-checked')).toBe(
        i === selectedIndex ? 'true' : 'false',
      );
    }
  });

  it('sets appropriate child as selected if selected prop is zero', () => {
    const selectedIndex = 0;
    const {container} = buildSimpleWrapper({selected: selectedIndex});
    const buttons = container.querySelectorAll('button');
    for (let i = 0; i < buttons.length; i++) {
      const button = buttons[i];
      expect(button.getAttribute('aria-checked')).toBe(
        i === selectedIndex ? 'true' : 'false',
      );
    }
  });

  it('sets appropriate child as selected if selected prop is an array', () => {
    const selectedIndices = [0, 2];
    const {container} = buildSimpleWrapper({selected: selectedIndices});
    const buttons = container.querySelectorAll('button');
    for (let i = 0; i < buttons.length; i++) {
      const button = buttons[i];
      expect(button.getAttribute('aria-checked')).toBe(
        selectedIndices.includes(i) ? 'true' : 'false',
      );
    }
  });
});

/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {
  render,
  fireEvent,
  getByRole,
  getByTestId,
} from '@testing-library/react';

import {Tab} from '../index.js';

describe('Tab', () => {
  it('basic rendering', () => {
    const {container} = render(<Tab active={true}>title</Tab>);
    const tab = getByRole(container, 'tab');
    expect(tab.getAttribute('aria-selected')).toBe('true');
  });

  it('component overrides', () => {
    const overrides = {
      // eslint-disable-next-line react/display-name
      Tab: ({children}) => <span data-testid="mock">{children}</span>,
    };
    const {container} = render(<Tab overrides={overrides}>Title</Tab>);
    getByTestId(container, 'mock');
  });

  it('onSelect and onClick are called on a click event', () => {
    const props = {
      onSelect: jest.fn(),
      onClick: jest.fn(),
    };
    const {container} = render(<Tab {...props}>Title</Tab>);
    const tab = getByRole(container, 'tab');
    fireEvent.click(tab);
    expect(props.onSelect).toHaveBeenCalledTimes(1);
    expect(props.onClick).toHaveBeenCalledTimes(1);
  });

  it('onSelect and onKeydown are called on a Enter keydown event', () => {
    const props = {
      onSelect: jest.fn(),
      onKeyDown: jest.fn(),
    };
    const {container} = render(<Tab {...props}>Title</Tab>);
    const tab = getByRole(container, 'tab');
    fireEvent.keyDown(tab, {key: 'Enter'});
    expect(props.onSelect).toHaveBeenCalledTimes(1);
    expect(props.onKeyDown).toHaveBeenCalledTimes(1);
  });

  it('onClick is not called when the tab is disabled', () => {
    const props = {
      onClick: jest.fn(),
      disabled: true,
    };
    const {container} = render(<Tab {...props}>Title</Tab>);
    const tab = getByRole(container, 'tab');
    fireEvent.click(tab);
    expect(props.onClick).not.toHaveBeenCalled();
  });

  it('onSelect nor onKeydown is not called on key presses when the tab is disabled', () => {
    const props = {
      onSelect: jest.fn(),
      onKeyDown: jest.fn(),
      disabled: true,
    };
    const {container} = render(<Tab {...props}>Title</Tab>);
    const tab = getByRole(container, 'tab');
    fireEvent.keyDown(tab, {key: 'Enter'});
    fireEvent.keyDown(tab, {which: 32});
    expect(props.onSelect).not.toHaveBeenCalled();
    expect(props.onKeyDown).not.toHaveBeenCalled();
  });
});

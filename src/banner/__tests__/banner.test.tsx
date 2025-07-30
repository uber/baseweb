/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { render, fireEvent, getByLabelText, getByText } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Banner, ACTION_POSITION } from '../index';

describe('banner', () => {
  it('calls click handler on trailing button', () => {
    const label = 'label';
    const handleClick = jest.fn();
    const { container } = render(<Banner action={{ label, onClick: handleClick }}>message</Banner>);
    const button = getByText(container, label);
    fireEvent.click(button);
    expect(handleClick.mock.calls.length).toBe(1);
  });

  it('calls click handler on trailing icon button', () => {
    const label = 'label';
    const handleClick = jest.fn();
    const { container } = render(
      <Banner action={{ label, icon: () => null, onClick: handleClick }}>message</Banner>
    );
    const button = getByLabelText(container, label);
    fireEvent.click(button);
    expect(handleClick.mock.calls.length).toBe(1);
  });

  it('calls click handler on below button', () => {
    const label = 'label';
    const handleClick = jest.fn();
    const { container } = render(
      <Banner action={{ label, onClick: handleClick, position: ACTION_POSITION.below }}>
        message
      </Banner>
    );
    const button = getByText(container, label);
    fireEvent.click(button);
    expect(handleClick.mock.calls.length).toBe(1);
  });

  it('renders endEnhancer when action has endEnhancer', () => {
    const EndEnhancer = <div>endEnhancer</div>;

    const { container } = render(
      <Banner action={{ label: 'label', endEnhancer: EndEnhancer, onClick: jest.fn() }}>
        message
      </Banner>
    );
    const button = getByText(container, 'endEnhancer');
    expect(button).toBeInTheDocument();
  });
});

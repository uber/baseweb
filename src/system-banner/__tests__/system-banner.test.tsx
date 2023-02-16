/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { render, fireEvent, getByLabelText } from '@testing-library/react';

import { SystemBanner } from '../index';

describe('SystemBanner', () => {
  it('calls click handler with single action', () => {
    const label = 'label';
    const handleClick = jest.fn();
    const { container } = render(
      <SystemBanner primaryAction={{ label, icon: () => null, onClick: handleClick }}>
        message
      </SystemBanner>
    );
    const button = getByLabelText(container, label);
    fireEvent.click(button);
    expect(handleClick.mock.calls.length).toBe(1);
  });
  it('calls click handlers with two actions', () => {
    const primaryActionLabel = 'primary-action-label';
    const secondaryActionLabel = 'secondary-action-label';

    const handleClickPrimary = jest.fn();
    const handleClickSecondary = jest.fn();
    const { container } = render(
      <SystemBanner
        primaryAction={{ label: primaryActionLabel, icon: () => null, onClick: handleClickPrimary }}
        secondaryAction={{
          label: secondaryActionLabel,
          icon: () => null,
          onClick: handleClickSecondary,
        }}
      >
        message
      </SystemBanner>
    );
    const primaryButton = getByLabelText(container, primaryActionLabel);
    fireEvent.click(primaryButton);
    const secondaryButton = getByLabelText(container, secondaryActionLabel);
    fireEvent.click(secondaryButton);

    expect(handleClickPrimary.mock.calls.length).toBe(1);
    expect(handleClickSecondary.mock.calls.length).toBe(1);
  });
});

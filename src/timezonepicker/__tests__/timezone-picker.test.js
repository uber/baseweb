/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import { TimezonePicker } from '../index.js';
import { TestBaseProvider } from '../../test/test-utils.js';

const mockedDate = new Date('2021-01-01T00:00:00Z');
const Example = ({ setDate }) => {
  return <TimezonePicker date={mockedDate} onChange={setDate} />;
};

const renderComponent = () => {
  const setDate = jest.fn();
  render(
    <TestBaseProvider>
      <Example setDate={setDate} />
    </TestBaseProvider>
  );
  return setDate;
};
describe('TimezonePicker', () => {
  it('onChange value is accurate for NZ', async () => {
    const setDate = renderComponent();
    fireEvent.click(screen.getByLabelText('Select a timezone.'));
    fireEvent.click(screen.getByText('(GMT+13) Pacific/Fakaofo'));

    expect(setDate).toBeCalledWith({
      id: 'Pacific/Fakaofo',
      label: '(GMT+13) Pacific/Fakaofo',
      offset: -780,
    });
  });

  it('onChange value is accurate for HI', async () => {
    const setDate = renderComponent();
    fireEvent.click(screen.getByLabelText('Select a timezone.'));
    fireEvent.click(screen.getByText('(GMT-10) Pacific/Honolulu'));

    expect(setDate).toBeCalledWith({
      id: 'Pacific/Honolulu',
      label: '(GMT-10) Pacific/Honolulu',
      offset: 600,
    });
  });

  it('onChange value is accurate for UTC', async () => {
    const setDate = renderComponent();
    fireEvent.click(screen.getByLabelText('Select a timezone.'));
    fireEvent.click(screen.getByText('(GMT+0) Europe/London'));

    expect(setDate).toBeCalledWith({
      id: 'Europe/London',
      label: '(GMT+0) Europe/London',
      offset: 0,
    });
  });
});

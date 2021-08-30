/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {
  render,
  getByTestId,
  fireEvent,
  getByText,
} from '@testing-library/react';
import {TestBaseProvider} from '../../test/test-utils.js';

import {Calendar} from '../index.js';

describe('Component', () => {
  it('does not display quick select if quickSelect is false', () => {
    const {container} = render(
      <Calendar
        overrides={{
          QuickSelectContainer: {props: {'data-testid': 'quick-select'}},
        }}
        quickSelect
      />,
    );
    expect(getByTestId(container, 'quick-select')).toBeNull();
  });
  it('displays quick select if quickSelect is true', () => {
    const {container} = render(
      <Calendar
        overrides={{
          QuickSelectContainer: {props: {'data-testid': 'quick-select'}},
        }}
        quickSelect
      />,
    );
    expect(getByTestId(container, 'quick-select')).not.toBeNull();
  });

  it('displays quick select if range and quickSelect is false', () => {
    const {container} = render(
      <Calendar
        overrides={{
          QuickSelectContainer: {props: {'data-testid': 'quick-select'}},
        }}
        quickSelect
        range
      />,
    );
    expect(getByTestId(container, 'quick-select')).not.toBeNull();
  });
  it('emits a quick select event if quick select is used to select a date', async () => {
    const onQuickSelectChange = jest.fn();
    const selectedOption = {id: 'today', beginDate: new Date()};
    const {container} = render(
      <TestBaseProvider>
        <Calendar
          overrides={{
            QuickSelectContainer: {props: {'data-testid': 'quick-select'}},
          }}
          quickSelect
          quickSelectOptions={[selectedOption]}
          range
          onQuickSelectChange={onQuickSelectChange}
        />
      </TestBaseProvider>,
    );
    const quickSelect = await getByTestId(container, 'quick-select');
    fireEvent.click(quickSelect);
    const items = container.querySelectorAll('li');
    fireEvent.click(items[1]);
    expect(onQuickSelectChange).toHaveBeenCalledWith(selectedOption);
  });
});

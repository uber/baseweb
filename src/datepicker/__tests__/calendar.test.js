/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import { render, getByTestId, fireEvent, queryByTestId, getByText } from '@testing-library/react';
import { TestBaseProvider } from '../../test/test-utils.js';

import { Calendar } from '../index.js';

describe('Component', () => {
  it('does not display quick select if quickSelect is false', () => {
    const { container } = render(
      <Calendar
        overrides={{
          QuickSelectContainer: { props: { 'data-testid': 'quick-select' } },
        }}
      />
    );
    expect(queryByTestId(container, 'quick-select')).toBeNull();
  });

  it('displays quick select if quickSelect is true', () => {
    const { container } = render(
      <Calendar
        overrides={{
          QuickSelectContainer: { props: { 'data-testid': 'quick-select' } },
        }}
        quickSelect
      />
    );
    expect(getByTestId(container, 'quick-select')).not.toBeNull();
  });

  it('displays quick select if range and quickSelect is false', () => {
    const { container } = render(
      <Calendar
        overrides={{
          QuickSelectContainer: { props: { 'data-testid': 'quick-select' } },
        }}
        quickSelect
        range
      />
    );
    expect(getByTestId(container, 'quick-select')).not.toBeNull();
  });

  it('emits a quick select event if quick select is used to select a date', async () => {
    const onQuickSelectChange = jest.fn();
    const { container } = render(
      <TestBaseProvider>
        <Calendar quickSelect range onQuickSelectChange={onQuickSelectChange} />
      </TestBaseProvider>
    );
    const quickSelect = container.querySelector('[data-baseweb="select"]')?.firstChild;
    if (quickSelect) {
      //flowlint-next-line unclear-type:off
      fireEvent.click(((quickSelect: any): HTMLElement));
    }
    fireEvent.click(
      await getByText(
        //flowlint-next-line unclear-type:off
        ((container.parentElement: any): HTMLElement),
        'Past Week'
      )
    );
    expect(onQuickSelectChange).toHaveBeenCalledWith(expect.objectContaining({ id: 'Past Week' }));
  });
});

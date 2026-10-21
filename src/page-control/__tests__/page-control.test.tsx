/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import PageControl from '../page-control';

describe('PageControl', () => {
  it('does not throw when a dot is clicked and onPageChange is not supplied', () => {
    const { getAllByRole } = render(<PageControl currentPage={1} numPages={3} />);
    const dots = getAllByRole('radio');
    expect(() => fireEvent.click(dots[1])).not.toThrow();
  });

  it('disables every dot and blocks page changes when disabled is set', () => {
    const onPageChange = jest.fn();
    const { getAllByRole } = render(
      <PageControl currentPage={1} numPages={3} disabled onPageChange={onPageChange} />
    );
    const dots = getAllByRole('radio');

    dots.forEach((dot) => expect(dot).toBeDisabled());

    fireEvent.click(dots[1]);
    expect(onPageChange).not.toHaveBeenCalled();
  });

  it('calls onPageChange with the clicked page when enabled', () => {
    const onPageChange = jest.fn();
    const { getAllByRole } = render(
      <PageControl currentPage={1} numPages={3} onPageChange={onPageChange} />
    );
    const dots = getAllByRole('radio');

    fireEvent.click(dots[1]);
    expect(onPageChange).toHaveBeenCalledWith({ nextPage: 2 });
  });
});

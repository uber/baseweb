/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
/* eslint-env browser */
import * as React from 'react';
import {
  render,
  getByTestId,
  getByText,
  fireEvent,
} from '@testing-library/react';

import Pagination from '../pagination.js';

function getSharedProps() {
  return {
    numPages: 3,
    currentPage: 2,
  };
}

describe('Pagination Stateless', () => {
  it('renders dropdown', () => {
    const props = getSharedProps();
    const {container} = render(
      <Pagination
        {...props}
        overrides={{
          Select: {
            props: {overrides: {Root: {props: {'data-testid': 'root'}}}},
          },
        }}
      />,
    );
    getByTestId(container, 'root');
  });

  it('handles prev button click', () => {
    const props = {
      ...getSharedProps(),
      onPageChange: jest.fn(),
      onPrevClick: jest.fn(),
    };
    const {container} = render(<Pagination {...props} />);
    fireEvent.click(getByText(container, 'Prev'));

    expect(props.onPrevClick.mock.calls.length).toBe(1);
    expect(props.onPageChange.mock.calls.length).toBe(1);
    expect(props.onPageChange.mock.calls[0]).toEqual([
      {
        nextPage: props.currentPage - 1,
        prevPage: props.currentPage,
      },
    ]);
  });

  it('next button click', () => {
    const props = {
      ...getSharedProps(),
      onPageChange: jest.fn(),
      onNextClick: jest.fn(),
    };
    const {container} = render(<Pagination {...props} />);
    fireEvent.click(getByText(container, 'Next'));

    expect(props.onPageChange.mock.calls[0]).toEqual([
      {
        nextPage: props.currentPage + 1,
        prevPage: props.currentPage,
      },
    ]);
    expect(props.onNextClick.mock.calls.length).toBe(1);
  });
});

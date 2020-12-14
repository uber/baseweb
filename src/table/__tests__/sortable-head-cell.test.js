/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {render, fireEvent, getByRole} from '@testing-library/react';

import {SortableHeadCell} from '../index.js';

describe('sortable-head-cell', () => {
  it('displays triangle down when direction is ASC', () => {
    const {container} = render(
      <SortableHeadCell direction="ASC" title="test" />,
    );
    const down = container.querySelector('[title="Sort ascending"]');
    expect(down).not.toBeNull();
  });

  it('fillClickTarget prop enable sort on cell click', () => {
    const spy = jest.fn();
    const {container} = render(
      <SortableHeadCell
        onSort={spy}
        direction="ASC"
        title="test"
        fillClickTarget
      />,
    );
    fireEvent.click(getByRole(container, 'columnheader'));
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('without fillClickTarget prop, no sort on cell click', () => {
    const spy = jest.fn();
    const {container} = render(
      <SortableHeadCell onSort={spy} direction="ASC" title="test" />,
    );
    fireEvent.click(getByRole(container, 'columnheader'));
    expect(spy).not.toHaveBeenCalled();
  });

  it('displays triangle up when direction is DESC', () => {
    const {container} = render(
      <SortableHeadCell direction="DESC" title="test" />,
    );
    const down = container.querySelector('[title="Sort descending"]');
    expect(down).not.toBeNull();
  });

  it('calls provided onSort fn on click', () => {
    const spy = jest.fn();
    const {container} = render(
      <SortableHeadCell onSort={spy} direction={null} title="test" />,
    );
    fireEvent.click(container.querySelector('button'));
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('does not call provided onSort fn on click if disabled', () => {
    const spy = jest.fn();
    const {container} = render(
      <SortableHeadCell onSort={spy} direction={null} title="test" disabled />,
    );
    fireEvent.click(container.querySelector('button'));
    expect(spy).toHaveBeenCalledTimes(0);
  });
});

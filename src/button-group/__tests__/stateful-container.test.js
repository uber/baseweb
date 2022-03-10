/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {render, fireEvent} from '@testing-library/react';

import {StatefulContainer, MODE} from '../index.js';

describe('ButtonGroup StatefulContainer', () => {
  it('provides expected props to children render function', () => {
    const children = jest.fn(() => <div>children</div>);
    render(<StatefulContainer>{children}</StatefulContainer>);

    const actual = children.mock.calls[0][0];
    expect(actual).toHaveProperty('onClick');
    expect(actual).toHaveProperty('selected', []);
  });

  it('calls provided click handler', () => {
    const onClick = jest.fn();
    const {container} = render(
      <StatefulContainer onClick={onClick}>
        {(childProps) => <div {...childProps}>children</div>}
      </StatefulContainer>,
    );

    fireEvent.click(container.querySelector('div'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('does not call state reducer if mode is not set', () => {
    const onClick = jest.fn();
    const stateReducer = jest.fn();
    const {container} = render(
      <StatefulContainer onClick={onClick} stateReducer={stateReducer}>
        {(childProps) => <div {...childProps}>children</div>}
      </StatefulContainer>,
    );

    fireEvent.click(container.querySelector('div'));
    expect(stateReducer).toHaveBeenCalledTimes(0);
  });

  it('calls state reducer if mode is set', () => {
    const onClick = jest.fn();
    const stateReducer = jest.fn();
    const {container} = render(
      <StatefulContainer
        mode={MODE.radio}
        onClick={onClick}
        stateReducer={stateReducer}
      >
        {(childProps) => <div {...childProps}>children</div>}
      </StatefulContainer>,
    );

    fireEvent.click(container.querySelector('div'));
    expect(stateReducer).toHaveBeenCalledTimes(1);
  });
});

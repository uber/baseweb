/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {render} from '@testing-library/react';
import {StatefulContainer} from '../index.js';

describe('StatefulComponentContainer', () => {
  it('basic render', () => {
    const children = jest.fn(() => null);
    render(
      <StatefulContainer initialState={{value: new Date()}}>
        {children}
      </StatefulContainer>,
    );
    expect(children).toHaveBeenCalledTimes(1);
  });

  it('passes provided event handlers to children', () => {
    const children = jest.fn(() => null);
    const onDayMouseOver = jest.fn();
    const onDayMouseLeave = jest.fn();
    const {container} = render(
      <StatefulContainer
        onDayMouseOver={onDayMouseOver}
        onDayMouseLeave={onDayMouseLeave}
        initialState={{value: new Date(2019, 2, 10)}}
      >
        {children}
      </StatefulContainer>,
    );
    expect(children.mock.calls[0][0].onDayMouseOver).toEqual(onDayMouseOver);
    expect(children.mock.calls[0][0].onDayMouseLeave).toEqual(onDayMouseLeave);
  });
});

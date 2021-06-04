/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {render} from '@testing-library/react';

import {StatefulPanelContainer} from '../index.js';

describe('StatefulPanelContainer', () => {
  it('provides expected props to children function', () => {
    const children = jest.fn(() => null);
    render(
      <StatefulPanelContainer initialState={{expanded: true}}>
        {children}
      </StatefulPanelContainer>,
    );

    expect(children.mock.calls.length).toBe(1);
    expect(children.mock.calls[0][0].expanded).toBe(true);
  });
});

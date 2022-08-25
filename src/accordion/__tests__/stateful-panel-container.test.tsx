/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { render } from '@testing-library/react';

import { StatefulPanelContainer } from '..';

describe('StatefulPanelContainer', () => {
  it('provides expected props to children function', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const children = jest.fn((arg) => null);
    render(
      <StatefulPanelContainer initialState={{ expanded: true }}>{children}</StatefulPanelContainer>
    );

    expect(children.mock.calls.length).toBe(1);
    expect(children.mock.calls[0][0].expanded).toBe(true);
  });
});

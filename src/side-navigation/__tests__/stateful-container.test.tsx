/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { render } from '@testing-library/react';

import StatefulContainer from '../stateful-container';

describe('side-navigation stateful-container', () => {
  it('provides expected props to child fn', () => {
    const props = {
      initialState: { activeItemId: '/' },
      onChange: jest.fn(),
      stateReducer: jest.fn(),
    };
    const children = jest.fn(() => null);

    render(<StatefulContainer {...props}>{children}</StatefulContainer>);
    expect(children).toHaveBeenCalledTimes(1);
    expect(children.mock.calls[0][0]).toHaveProperty('activeItemId', '/');
    expect(children.mock.calls[0][0]).toHaveProperty('onChange');
  });
});

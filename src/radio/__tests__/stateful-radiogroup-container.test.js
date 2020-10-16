/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {render} from '@testing-library/react';

import {StatefulContainer} from '../index.js';

describe('Stateful container', function() {
  it('passes additional props to children', () => {
    const children = jest.fn(() => null);
    render(<StatefulContainer foo="bar">{children}</StatefulContainer>);
    expect(children.mock.calls[0][0]).toHaveProperty('foo', 'bar');
  });

  it('passes intial state to children', () => {
    const children = jest.fn(() => null);
    render(
      <StatefulContainer initialState={{value: 'x'}}>
        {children}
      </StatefulContainer>,
    );
    expect(children.mock.calls[0][0]).toHaveProperty('value', 'x');
  });
});

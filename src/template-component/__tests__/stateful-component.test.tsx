/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { render, getByText } from '@testing-library/react';

import { StatefulComponent } from '..';

describe('StatefulComponent', () => {
  it('renders the content', () => {
    const { container } = render(<StatefulComponent>test</StatefulComponent>);
    getByText(container, 'test');
  });
});

/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import * as React from 'react';
import {render, queryAllByTestId} from '@testing-library/react';

import {StyledLink} from '../../link/index.js';
import {Breadcrumbs} from '../breadcrumbs.js';

describe('Breadcrumbs', () => {
  it('applies correct accessibility attributes to root element', () => {
    const ariaLabel = 'Breadcrumbs navigation';
    const {container} = render(
      <Breadcrumbs ariaLabel={ariaLabel}>
        <StyledLink href="#">Parent Page</StyledLink>
        <StyledLink href="#">Sub-Parent Page</StyledLink>

        <span>Current Page</span>
      </Breadcrumbs>,
    );
    expect(
      container.querySelector(`[aria-label="${ariaLabel}"`),
    ).not.toBeNull();
  });

  it('ignores null, true, and false', () => {
    const {container} = render(
      <Breadcrumbs
        overrides={{Separator: {props: {'data-testid': 'separator'}}}}
      >
        <span>Foo</span>
        {null}
        <span>Bar</span>
        {true}
        {false}
      </Breadcrumbs>,
    );

    const separators = queryAllByTestId(container, 'separator');
    expect(separators.length).toBe(1);
  });
});

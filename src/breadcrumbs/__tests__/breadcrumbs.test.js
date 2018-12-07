/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow
import React from 'react';
import {shallow} from 'enzyme';
import {StyledLink} from '../../link/index.js';
import {Breadcrumbs} from '../index.js';

describe('Breadcrumbs', () => {
  it('applies correct accessibility attributes to root element', () => {
    const example = shallow(
      <Breadcrumbs>
        <StyledLink href="#">Parent Page</StyledLink>
        <StyledLink href="#">Sub-Parent Page</StyledLink>
        <span>Current Page</span>
      </Breadcrumbs>,
    );
    expect(example).toHaveProp('aria-label', 'Breadcrumbs navigation');
  });

  it('displays separators in correct positions', () => {
    expect(
      shallow(
        <Breadcrumbs>
          <StyledLink href="#">Parent Page</StyledLink>
          <StyledLink href="#">Sub-Parent Page</StyledLink>
          <span>Current Page</span>
        </Breadcrumbs>,
      ),
    ).toMatchSnapshot();
  });
});

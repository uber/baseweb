/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import * as React from 'react';
import {shallow} from 'enzyme';
import Step from '../step.js';

describe('Step', () => {
  it('applies isCompleted prop correctly', () => {
    expect(shallow(<Step isCompleted />)).toMatchSnapshot();
  });

  it('applies isActive prop correctly', () => {
    expect(shallow(<Step isActive />)).toMatchSnapshot();
  });

  it('applies isLast prop correctly', () => {
    expect(shallow(<Step isLast />)).toMatchSnapshot();
  });

  it('applies title prop correctly', () => {
    expect(shallow(<Step title="Test Title" />)).toMatchSnapshot();
  });

  it('renders children correctly if isActive is provided', () => {
    expect(shallow(<Step isActive>Content</Step>)).toMatchSnapshot();
  });
});

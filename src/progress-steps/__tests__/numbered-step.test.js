/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import * as React from 'react';
import {shallow} from 'enzyme';
import NumberedStep from '../numbered-step.js';

describe('NumberedStep', () => {
  it('applies isCompleted prop correctly', () => {
    expect(shallow(<NumberedStep isCompleted />)).toMatchSnapshot();
  });

  it('applies isActive prop correctly', () => {
    expect(shallow(<NumberedStep isActive />)).toMatchSnapshot();
  });

  it('applies isLast prop correctly', () => {
    expect(shallow(<NumberedStep isLast />)).toMatchSnapshot();
  });

  it('applies title prop correctly', () => {
    expect(shallow(<NumberedStep title="Test Title" />)).toMatchSnapshot();
  });

  it('renders children correctly if isActive is provided', () => {
    expect(
      shallow(<NumberedStep isActive>Content</NumberedStep>),
    ).toMatchSnapshot();
  });
});

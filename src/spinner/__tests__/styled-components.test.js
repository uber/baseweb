/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import React from 'react';
import {shallow} from 'enzyme';
import {StyledSvg, StyledTrackPath, StyledActivePath} from '../index.js';

describe('Spinner styled components', () => {
  test('StyledSvg - basic render', () => {
    const component = shallow(<StyledSvg />);
    expect(component.instance().getStyles()).toMatchSnapshot(
      'StyledSvg has correct default styles',
    );
  });
  test('StyledSvg - custom size', () => {
    const component = shallow(<StyledSvg size={56} />);
    expect(component.instance().getStyles()).toMatchSnapshot(
      'StyledSvg has correct height and width styles',
    );
  });
  test('StyledSvg - custom color', () => {
    const component = shallow(<StyledSvg color="#00FF00" />);
    expect(component.instance().getStyles()).toMatchSnapshot(
      'StyledSvg has correct fill value',
    );
  });

  test('StyledTrackPath - basic render', () => {
    const component = shallow(<StyledTrackPath />);
    expect(component.instance().getStyles()).toMatchSnapshot(
      'StyledSvg has correct fill value',
    );
  });

  test('StyledActivePath - basic render', () => {
    const component = shallow(<StyledActivePath />);
    expect(component.instance().getStyles()).toMatchSnapshot(
      'StyledSvg has correct fill value',
    );
  });
});

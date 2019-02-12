/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import React from 'react';
import {shallow} from 'enzyme';
import {
  StyledRoot,
  StyledTrack,
  StyledInnerTrack,
  StyledTick,
  StyledThumb,
  StyledInnerThumb,
  StyledTickBar,
} from '../index.js';

describe('Slider styled components', () => {
  describe('StyledRoot', function() {
    test('StyledRoot', () => {
      const component = shallow(
        <StyledRoot>
          <div />
        </StyledRoot>,
      );
      expect(component.instance().getStyles()).toMatchSnapshot(
        'StyledRoot has correct styles',
      );
    });
  });
  describe('StyledTrack', function() {
    test('StyledTrack', () => {
      const component = shallow(
        <StyledTrack $value={[10, 20]}>
          <div />
        </StyledTrack>,
      );
      expect(component.instance().getStyles()).toMatchSnapshot(
        'StyledTrack has correct styles',
      );
    });
  });
  describe('StyledInnerTrack', function() {
    test('StyledInnerTrack', () => {
      const component = shallow(
        <StyledInnerTrack $value={[50]}>
          <div />
        </StyledInnerTrack>,
      );
      expect(component.instance().getStyles()).toMatchSnapshot(
        'StyledInnerTrack has correct styles',
      );
    });
  });
  describe('StyledThumb', function() {
    test('StyledThumb', () => {
      const component = shallow(<StyledThumb $value={[50]} $thumbIndex={0} />);
      expect(component.instance().getStyles()).toMatchSnapshot(
        'StyledThumb has correct styles',
      );
    });
    test('StyledThumb left', () => {
      const component = shallow(
        <StyledThumb $value={[50, 70]} $thumbIndex={0} />,
      );
      expect(component.instance().getStyles()).toMatchSnapshot(
        'StyledThumb left range has correct styles',
      );
    });
    test('StyledThumb right', () => {
      const component = shallow(
        <StyledThumb $value={[50, 70]} $thumbIndex={1} />,
      );
      expect(component.instance().getStyles()).toMatchSnapshot(
        'StyledThumb right range has correct styles',
      );
    });
  });
  describe('StyledInnerThumb', function() {
    test('StyledInnerThumb', () => {
      const component = shallow(<StyledInnerThumb />);
      expect(component.instance().getStyles()).toMatchSnapshot(
        'StyledInnerThumb has correct styles',
      );
    });
  });
  describe('StyledTick', function() {
    test('StyledTick', () => {
      const component = shallow(
        <StyledTick>
          <div />
        </StyledTick>,
      );
      expect(component.instance().getStyles()).toMatchSnapshot(
        'StyledTick has correct styles',
      );
    });
  });
  describe('StyledTickBar', function() {
    test('StyledTickBar', () => {
      const component = shallow(
        <StyledTickBar>
          <div />
        </StyledTickBar>,
      );
      expect(component.instance().getStyles()).toMatchSnapshot(
        'StyledTickBar has correct styles',
      );
    });
  });
});

/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {shallow} from 'enzyme';
import {
  LightTheme,
  createTheme,
  lightThemePrimitives,
} from '../../themes/index.js';
import {
  BaseButton,
  StartEnhancer,
  EndEnhancer,
  getStyleForKind,
  getStyleForShape,
} from '../styled-components.js';
import {KIND, SIZE, SHAPE} from '../constants.js';

function makeTest({
  title,
  component: Component,
  props = {},
  children = null,
  snapshotName = 'correct styles',
}: {
  title?: string,
  component?: React.ComponentType<*>,
  props?: {},
  children?: *,
  snapshotName?: string,
}) {
  // $FlowFixMe
  test(title, () => {
    // $FlowFixMe
    const shallowed = shallow(<Component {...props}>{children}</Component>);
    expect(shallowed.instance().getStyles()).toMatchSnapshot(snapshotName);
  });
}

const allKinds = Object.values(KIND);
const allSizes = Object.values(SIZE);
const allShapes = Object.values(SHAPE);
const allLoadingStates = [false, true];

describe('Button Styled Components', () => {
  allKinds.forEach($kind => {
    allLoadingStates.forEach($isLoading => {
      // $FlowFixMe
      test(`getStyleForKind ${$kind} and loading ${$isLoading}`, () => {
        expect(
          // $FlowFixMe
          getStyleForKind({$theme: LightTheme, $kind, $isLoading}),
        ).toMatchSnapshot();
      });
    });
  });

  allShapes.forEach($shape => {
    allSizes.forEach($size => {
      // $FlowFixMe
      test(`getStyleForShape ${$shape} ${$size}`, () => {
        expect(
          // $FlowFixMe
          getStyleForShape({$theme: LightTheme, $shape, $size}),
        ).toMatchSnapshot();
      });
    });
  });

  allShapes.forEach(shape => {
    makeTest({
      title: `BaseButton - basic render`,
      component: BaseButton,
    });
  });

  test(`BaseButton - respects useRoundedCorners`, () => {
    let theme = createTheme(lightThemePrimitives, {
      borders: {useRoundedCorners: false},
    });
    const rendered = shallow(<BaseButton $theme={theme}>Test</BaseButton>);
    expect(rendered.instance().getStyles().borderBottomLeftRadius).toMatch(
      '0px',
    );
    expect(rendered.instance().getStyles().borderBottomRightRadius).toMatch(
      '0px',
    );
    expect(rendered.instance().getStyles().borderTopLeftRadius).toMatch('0px');
    expect(rendered.instance().getStyles().borderTopRightRadius).toMatch('0px');
  });

  makeTest({
    title: 'StartEnhancer - basic render',
    component: StartEnhancer,
  });

  makeTest({
    title: 'EndEnhancer - basic render',
    component: EndEnhancer,
  });
});

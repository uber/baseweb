/* eslint-disable flowtype/require-valid-file-annotation, react/prop-types */
import React from 'react';
import {shallow} from 'enzyme';
import {BaseButton, StartEnhancer, EndEnhancer} from '../styled-components';
import {KIND, SIZE, SHAPE} from '../constants';

function makeTest({
  title,
  component: Component,
  props = {},
  children = null,
  snapshotName = 'correct styles',
}) {
  test(title, () => {
    const shallowed = shallow(<Component {...props}>{children}</Component>);
    expect(shallowed.instance().getStyles()).toMatchSnapshot(snapshotName);
  });
}

const allKinds = Object.values(KIND);
const allSizes = Object.values(SIZE);
const allShapes = Object.values(SHAPE);

describe('Button Styled Components', () => {
  allKinds.forEach(kind => {
    allSizes.forEach(size => {
      allShapes.forEach(shape => {
        makeTest({
          title: `BaseButton - ${kind} ${size} ${shape}`,
          component: BaseButton,
          props: {
            $kind: kind,
            $shape: shape,
            $size: size,
          },
        });
      });
    });
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

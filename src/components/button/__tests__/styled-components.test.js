/* eslint-disable flowtype/require-valid-file-annotation, react/prop-types */
import React from 'react';
import {shallow} from 'enzyme';
import {
  BaseButton,
  PrimaryButton,
  SecondaryButton,
  TertiaryButton,
  MinimalButton,
  ButtonLabel,
  StartEnhancer,
  EndEnhancer,
} from '../styled-components';
import {BUTTON_KIND, BUTTON_SIZE} from '../constants';

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

describe('Button Styled Components', () => {
  makeTest({
    title: 'BaseButton - basic render',
    component: BaseButton,
  });

  makeTest({
    title: 'BaseButton - round',
    component: BaseButton,
    props: {
      $kind: BUTTON_KIND.round,
    },
  });

  makeTest({
    title: 'BaseButton - round (compact)',
    component: BaseButton,
    props: {
      $type: BUTTON_SIZE.compact,
      $kind: BUTTON_KIND.round,
    },
  });

  makeTest({
    title: 'PrimaryButton - basic render',
    component: PrimaryButton,
  });

  makeTest({
    title: 'SecondaryButton - basic render',
    component: SecondaryButton,
  });

  makeTest({
    title: 'TertiaryButton - basic render',
    component: TertiaryButton,
  });

  makeTest({
    title: 'MinimalButton - basic render',
    component: MinimalButton,
  });

  makeTest({
    title: 'ButtonLabel - basic render',
    component: ButtonLabel,
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

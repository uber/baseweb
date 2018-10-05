/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import React from 'react';
import {shallow} from 'enzyme';
import {StyledBody, StyledCloseIcon, KIND} from '../index';

describe('Component styled components', () => {
  test('StyledBody - basic render', () => {
    const component = shallow(<StyledBody />);

    expect(component.instance().getStyles()).toMatchSnapshot(
      'StyledBody has correct default styles',
    );

    component.setProps({$kind: KIND.info});
    expect(component.instance().getStyles().backgroundColor).toEqual(
      '$theme.colors.primary500',
    );

    component.setProps({$kind: KIND.positive});
    expect(component.instance().getStyles().backgroundColor).toEqual(
      '$theme.colors.positive500',
    );

    component.setProps({$kind: KIND.warning});
    expect(component.instance().getStyles().backgroundColor).toEqual(
      '$theme.colors.warning500',
    );

    component.setProps({$kind: KIND.negative});
    expect(component.instance().getStyles().backgroundColor).toEqual(
      '$theme.colors.negative500',
    );

    component.setProps({$isHidden: false, $isAnimating: false});
    expect(component.instance().getStyles().height).toEqual('auto');
    expect(component.instance().getStyles().opacity).toEqual(1);

    component.setProps({$isHidden: true, $isAnimating: true});
    expect(component.instance().getStyles().height).toEqual('auto');
    expect(component.instance().getStyles().opacity).toEqual(0);

    component.setProps({$isHidden: true, $isAnimating: false});
    expect(component.instance().getStyles().height).toEqual(0);
    expect(component.instance().getStyles().opacity).toEqual(0);
  });
  test('StyledCloseIcon - basic render', () => {
    const component = shallow(<StyledCloseIcon $prop={false} />);

    expect(component.instance().getStyles()).toMatchSnapshot(
      'StyledSvg has correct default styles',
    );
  });
});

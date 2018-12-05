/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import React from 'react';
import {shallow} from 'enzyme';

import {StyledBody, StyledCloseIcon, KIND, TYPE} from '../index.js';

describe('Component styled components', () => {
  test('StyledBody - basic render', () => {
    const component = shallow(<StyledBody />);

    expect(component.instance().getStyles()).toMatchSnapshot(
      'StyledBody has correct default styles',
    );

    component.setProps({$kind: KIND.info});
    expect(component.instance().getStyles().backgroundColor).toEqual(
      '$theme.colors.toastPrimaryBackground',
    );

    component.setProps({$kind: KIND.positive});
    expect(component.instance().getStyles().backgroundColor).toEqual(
      '$theme.colors.toastPositiveBackground',
    );

    component.setProps({$kind: KIND.warning});
    expect(component.instance().getStyles().backgroundColor).toEqual(
      '$theme.colors.toastWarningBackground',
    );

    component.setProps({$kind: KIND.negative});
    expect(component.instance().getStyles().backgroundColor).toEqual(
      '$theme.colors.toastNegativeBackground',
    );

    component.setProps({$isVisible: false});
    expect(component.instance().getStyles().opacity).toEqual(0);

    component.setProps({$isVisible: true});
    expect(component.instance().getStyles().opacity).toEqual(1);
  });
  test('StyledBody - inline type styles', () => {
    const component = shallow(<StyledBody notificationType={TYPE.inline} />);

    expect(component.instance().getStyles()).toMatchSnapshot(
      'StyledBody has correct default styles when type is set to TYPE.inline',
    );
  });
  test('StyledCloseIcon - basic render', () => {
    const component = shallow(<StyledCloseIcon $prop={false} />);

    expect(component.instance().getStyles()).toMatchSnapshot(
      'StyledSvg has correct default styles',
    );
  });
});

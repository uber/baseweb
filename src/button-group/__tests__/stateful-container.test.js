/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import {mount} from 'enzyme';

import {StatefulContainer} from '../index.js';

describe('ButtonGroup StatefulContainer', () => {
  it('provides expected props to children render function', () => {
    const children = jest.fn(() => <div>children</div>);
    const wrapper = mount(<StatefulContainer>{children}</StatefulContainer>);

    const actual = children.mock.calls[0][0];
    expect(actual).toHaveProperty('onClick');
    expect(actual).toHaveProperty('selected', []);
  });

  it('calls provided click handler', () => {
    const onClick = jest.fn();
    const wrapper = mount(
      <StatefulContainer onClick={onClick}>
        {childProps => <div {...childProps}>children</div>}
      </StatefulContainer>,
    );

    const element = wrapper.find('div').first();
    element.simulate('click');

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import React from 'react';
import {shallow} from 'enzyme';
import {List, ListItem} from '../styled-components';

describe('Menu Styled Components', () => {
  test('ListItem - basic render', () => {
    const component = shallow(<ListItem>This is a list item</ListItem>);
    expect(component.instance().getStyles()).toMatchSnapshot(
      'ListItem has correct styles',
    );
  });

  test('ListItem - highlighted render', () => {
    const component = shallow(
      <ListItem $isHighlighted={true}>
        This is a highlighted list item
      </ListItem>,
    );
    expect(component.instance().getStyles()).toMatchSnapshot(
      'ListItem has correct styles when highlighted',
    );
  });

  test('List - basic render', () => {
    const component = shallow(<List />);
    expect(component.instance().getStyles()).toMatchSnapshot(
      'List has correct styles',
    );
  });
});

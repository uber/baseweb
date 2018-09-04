/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import React from 'react';
import {mount} from 'enzyme';
import {List, ListItem} from '../styled-components';
import Menu from '../menu';

const mockItems = [{label: 'item1'}, {label: 'item2'}];

function getSharedProps() {
  return {
    items: mockItems,
    getItemLabel: item => item.label,
    rootRef: React.createRef(),
    overrides: {
      List,
      ListItem,
    },
  };
}

describe('Menu Stateless Component', () => {
  test('basic renders', () => {
    // $FlowFixMe
    const component = mount(<Menu {...getSharedProps()} />);

    expect(component.find(List)).toExist();
    expect(component.find(List)).toHaveProp({
      $ref: React.createRef(),
    });

    expect(component.find(ListItem)).toExist();
    expect(component.find(ListItem).first()).toHaveProp({});

    expect(
      component
        .find(ListItem)
        .first()
        .text(),
    ).toEqual(mockItems[0].label);

    component.setProps({
      getRequiredItemProps: (item, index) => ({
        key: String(index),
        isHighlighted: true,
      }),
    });
    expect(component.find(ListItem).first()).toHaveProp({
      $isHighlighted: true,
    });
  });

  test('renders with components overrides', () => {
    const NewListItem = jest
      .fn()
      .mockImplementation(() => <div id="list-item" />);
    const props = {
      ...getSharedProps(),
      overrides: {
        ListItem: NewListItem,
      },
    };
    // $FlowFixMe
    const component = mount(<Menu {...props} />);
    expect(component.find(ListItem)).not.toExist();
    expect(component.find(NewListItem)).toExist();
  });
});

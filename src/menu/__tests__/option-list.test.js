/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow
import React from 'react';
import {mount} from 'enzyme';
import {ListItem} from '../styled-components.js';
import OptionList from '../option-list.js';

const mockItem = {label: 'item1'};

function getSharedProps() {
  return {
    item: mockItem,
    getItemLabel: item => item.label,
  };
}

describe('Option List Stateless Component', () => {
  test('basic renders', () => {
    const component = mount(<OptionList {...getSharedProps()} />);

    expect(component.find(ListItem)).toExist();

    expect(
      component
        .find(ListItem)
        .first()
        .text(),
    ).toEqual(mockItem.label);
  });

  test('renders with components overrides', () => {
    const NewListItem = () => <div id="list-item" />;
    const props = {
      ...getSharedProps(),
      overrides: {
        ListItem: {
          component: NewListItem,
          props: {
            custom: 'prop',
          },
        },
      },
    };
    const component = mount(<OptionList {...props} />);
    expect(component.find(ListItem)).not.toExist();
    expect(component.find(NewListItem)).toExist();
    expect(component.find(NewListItem).prop('custom')).toEqual('prop');
  });
});

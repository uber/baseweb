// @flow
import React from 'react';
import {mount} from 'enzyme';
import {List, ListItem} from '../styled-components';
import Menulist from '../menulist';

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

describe('Menulist Stateless Component', () => {
  test('basic renders', () => {
    // $FlowFixMe
    const component = mount(<Menulist {...getSharedProps()} />);

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
    const component = mount(<Menulist {...props} />);
    expect(component.find(ListItem)).not.toExist();
    expect(component.find(NewListItem)).toExist();
  });
});

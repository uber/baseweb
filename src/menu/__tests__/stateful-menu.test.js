// @flow
import React from 'react';
import {mount} from 'enzyme';
import StatefulMenu from '../stateful-menu';
import StatefulContainer from '../stateful-container';
import Menu from '../menu';

describe('Menu StatefulMenu', () => {
  test('renders with props', () => {
    const props = {
      items: [{label: 'item1'}, {label: 'item2'}],
      getItemLabel: item => item.label,
    };
    const component = mount(<StatefulMenu {...props} />);
    expect(component.find(StatefulContainer).length).toBe(1);
    expect(component.find(Menu).length).toBe(1);
  });
});

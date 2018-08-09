// @flow
import React from 'react';
import {mount} from 'enzyme';
import StatefulMenulist from '../stateful-menulist';
import StatefulContainer from '../stateful-container';
import Menulist from '../menulist';

describe('Menulist StatefulMenulist', () => {
  test('renders with props', () => {
    const props = {
      items: [{label: 'item1'}, {label: 'item2'}],
      getItemLabel: item => item.label,
    };
    const component = mount(<StatefulMenulist {...props} />);
    expect(component.find(StatefulContainer).length).toBe(1);
    expect(component.find(Menulist).length).toBe(1);
  });
});

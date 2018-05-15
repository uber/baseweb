// @flow

import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Button from './index';

Enzyme.configure({adapter: new Adapter()});

test('<Button />', () => {
  const wrapper = shallow(<Button onClick={() => {}} />);
  expect(wrapper.text()).toBe('it is a button!');
});

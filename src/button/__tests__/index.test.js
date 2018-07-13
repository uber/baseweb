// @flow
import React from 'react';
import {shallow} from 'enzyme';

import Button from '../index';

test('<Button />', () => {
  const wrapper = shallow(<Button onClick={() => {}} />);
  expect(wrapper.text()).toBe('it is a button!');
  expect(wrapper).toMatchSnapshot();
});

/* eslint-disable flowtype/require-valid-file-annotation, react/prop-types */
import React from 'react';
import {mount} from 'enzyme';
import {StartEnhancer, EndEnhancer} from '../styled-components';
import Button from '../button';

describe('Button Component', () => {
  test('basic render', () => {
    const component = mount(<Button />);

    expect(component.find(StartEnhancer)).not.toExist();
    expect(component.find(EndEnhancer)).not.toExist();

    component.setProps({
      startEnhancer: 'start',
      endEnhancer: 'end',
    });

    expect(component.find(StartEnhancer)).toExist();
    expect(component.find(EndEnhancer)).toExist();
  });

  test('renders with components overrides', () => {
    const NewStartEnhancer = () => <div />;

    const props = {
      startEnhancer: 'start',
      overrides: {
        StartEnhancer: NewStartEnhancer,
      },
    };

    const component = mount(<Button {...props} />);

    expect(component.find(StartEnhancer)).not.toExist();
    expect(component.find(NewStartEnhancer)).toExist();
  });
});

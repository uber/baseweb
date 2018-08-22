/* eslint-disable flowtype/require-valid-file-annotation, react/prop-types */
import React from 'react';
import {mount} from 'enzyme';
import {StartEnhancer, EndEnhancer, ButtonLabel} from '../styled-components';
import Button from '../button';

function getSharedProps() {
  return {
    onClick: () => {},
  };
}

describe('Button Component', () => {
  test('basic render', () => {
    const component = mount(<Button {...getSharedProps()} />);

    expect(component.find(StartEnhancer)).not.toExist();
    expect(component.find(EndEnhancer)).not.toExist();
    expect(component.find(ButtonLabel)).not.toExist();

    component.setProps({
      label: 'label',
      startEnhancer: 'start',
      endEnhancer: 'end',
    });

    expect(component.find(StartEnhancer)).toExist();
    expect(component.find(EndEnhancer)).toExist();
    expect(component.find(ButtonLabel)).toExist();
  });

  test('renders with components overrides', () => {
    const NewButtonLabelComponent = () => <div />;

    const props = {
      ...getSharedProps(),
      label: 'some label',
      overrides: {
        ButtonLabel: NewButtonLabelComponent,
      },
    };

    const component = mount(<Button {...props} />);

    expect(component.find(ButtonLabel)).not.toExist();
    expect(component.find(NewButtonLabelComponent)).toExist();
  });
});

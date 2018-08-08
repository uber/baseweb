// @flow
import React from 'react';
import {shallow} from 'enzyme';
import StatefulTextarea from '../stateful-textarea';
import {Textarea} from '../styled-components';
describe('Textarea', () => {
  test('StatefulTextarea - basic render', () => {
    const props = {
      onChange: jest.fn(),
      overrides: {
        Input: function CustomTextarea(props) {
          return (
            <span>
              <Textarea {...props} />
            </span>
          );
        },
      },
    };

    const component = shallow(<StatefulTextarea {...props} />);

    expect(component).toMatchSnapshot('renders <StatefulContainer/>');

    expect(component.dive()).toMatchSnapshot('renders <Textarea/> as a child');
  });
});

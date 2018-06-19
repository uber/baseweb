/* eslint-disable */
import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ThemeProvider from './theme-provider';
import styled from './styled';
import {withStyletronProvider} from '../utils/test-utils';

Enzyme.configure({adapter: new Adapter()});

test('<ThemeProvider />', () => {
  const StyledMockButton = styled('button', ({theme}) => ({
    backgroundColor: 'red',
  }));

  const TestComponent = withStyletronProvider(() => (
    <ThemeProvider theme="red">
      <StyledMockButton id="testButton" />
    </ThemeProvider>
  ));
  const wrapper = mount(<TestComponent />);
  const button = wrapper
    .find('#testButton')
    .children()
    .at(0);
  expect(button.props().$theme).toBe('red');
});

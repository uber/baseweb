/* eslint-disable */
import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import styled from './styled';
import {withStyletronProvider, withThemeProvider} from '../utils/test-utils';
import {LightTheme} from '../themes';

Enzyme.configure({adapter: new Adapter()});

test('styled', () => {
  const StyledMockButton = styled('button', ({$theme}) => ({
    backgroundColor: $theme.colors.primary400,
  }));

  const TestComponent = withStyletronProvider(
    withThemeProvider(() => <StyledMockButton id="testButton" />)
  );
  const wrapper = mount(<TestComponent />);
  const button = wrapper
    .find('#testButton')
    .children()
    .at(0);
  expect(button.props().$theme).toBe(LightTheme);
});

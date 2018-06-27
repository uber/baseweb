/* eslint-disable */
import React from 'react';
import {mount} from 'enzyme';

import styled from './styled';
import {withStyletronProvider, withThemeProvider} from '../test/test-utils';
import {LightTheme} from '../themes';

jest.unmock('./styled.js');

test('styled', () => {
  const StyledMockButton = styled('button', ({$theme}) => ({
    backgroundColor: $theme.colors.primary400,
  }));

  const TestComponent = withStyletronProvider(
    withThemeProvider(() => <StyledMockButton id="testButton" />),
  );
  const wrapper = mount(<TestComponent />);
  const button = wrapper
    .find('#testButton')
    .children()
    .at(0);
  expect(button.props().$theme).toBe(LightTheme);
});

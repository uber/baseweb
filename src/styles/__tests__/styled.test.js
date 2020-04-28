/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-disable */
// @flow
import * as React from 'react';
import {mount} from 'enzyme';

import {styled, withStyle, withWrapper} from '../styled.js';
import {
  withStyletronProvider,
  withThemeProvider,
} from '../../test/test-utils.js';
import {LightTheme} from '../../themes/index.js';

jest.unmock('../styled.js');

describe('withWrapper', () => {
  it('preserves non styletron props when extending with "withStyle"', () => {
    const StyledComponentElement = styled('div', {color: 'pink'});
    const StyledComponent = withWrapper(
      StyledComponentElement,
      Styled =>
        function(props) {
          return <Styled id="test" aria-label="something useful" {...props} />;
        },
    );
    const ExtendedStyledComponent = withStyle(StyledComponent, {color: 'red'});
    const TestComponent = withStyletronProvider(
      withThemeProvider(() => <ExtendedStyledComponent />),
    );
    const wrapper = mount(<TestComponent />);
    const props = wrapper
      .find('#test')
      .children()
      .at(0)
      .props();
    expect(props['aria-label']).toBe('something useful');
  });
});

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
  wrapper.unmount();
});

test('styled can be called with single string argument', () => {
  const ADiv = styled('div');
  expect(ADiv).toBeTruthy();
  const wrapper = mount(<ADiv />);
  wrapper.unmount();
});

test('styled override prop', () => {
  const StyledMockButton = styled('button', {
    color: 'red',
  });

  const styleFn = props => {
    return {color: props.$color};
  };

  const TestComponent = withStyletronProvider(
    withThemeProvider(() => (
      <div>
        <StyledMockButton id="testButton1" />
        <StyledMockButton id="testButton2" $style={{color: 'blue'}} />
        <StyledMockButton
          id="testButton3"
          $style={{
            borderTopLeftRadius: '2px',
            borderTopRightRadius: '2px',
            borderBottomRightRadius: '2px',
            borderBottomLeftRadius: '2px',
          }}
        />
        <StyledMockButton id="testButton4" $color="red" $style={styleFn} />
        <StyledMockButton id="testButton5" $color="blue" $style={styleFn} />
      </div>
    )),
  );

  const wrapper = mount(<TestComponent />);

  // First button (no overrides) should have single class for red text color
  const button1 = wrapper.find('button#testButton1').getDOMNode();
  expect(button1.classList).toHaveLength(1);
  const colorRedClass = button1.classList.item(0);

  // Second button should have single class for blue text
  const button2 = wrapper.find('button#testButton2').getDOMNode();
  expect(button2.classList).toHaveLength(1);
  expect(button2.classList.item(0)).not.toBe(colorRedClass);
  const colorBlueClass = button2.classList.item(0);

  // Third button should have 5 classes, one for red text, four for border radii
  const button3 = wrapper.find('button#testButton3').getDOMNode();
  expect(button3.classList).toHaveLength(5);
  expect(button3.classList).toContain(colorRedClass);

  // Fourth button should have single red class
  const button4 = wrapper.find('button#testButton4').getDOMNode();
  expect(button4.classList).toHaveLength(1);
  expect(button4.classList).toContain(colorRedClass);

  // Fifth button should have single blue class
  const button5 = wrapper.find('button#testButton5').getDOMNode();
  expect(button5.classList).toHaveLength(1);
  expect(button5.classList).toContain(colorBlueClass);

  wrapper.unmount();
});

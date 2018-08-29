/*
MIT License

Copyright (c) 2018 Uber Technologies, Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/
/* eslint-disable */
import React from 'react';
import {mount} from 'enzyme';

import styled from '../styled';
import {withStyletronProvider, withThemeProvider} from '../../test/test-utils';
import {LightTheme} from '../../themes';

jest.unmock('../styled.js');

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
        <StyledMockButton id="testButton3" $style={{borderRadius: '2px'}} />
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

  // Third button should have 2 classes, one for red text, one for border radius
  const button3 = wrapper.find('button#testButton3').getDOMNode();
  expect(button3.classList).toHaveLength(2);
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

test('styled override styled component', () => {
  const StyledBase = styled('div', {
    color: 'red',
  });
  const StyledBaseOverride = styled(StyledBase, {
    color: 'blue',
  });
  const TestComponent = withStyletronProvider(() => (
    <div>
      <StyledBase />
      <StyledBaseOverride />
    </div>
  ));

  const wrapper = mount(<TestComponent />);

  const base = wrapper.find(StyledBase).getDOMNode();
  expect(base.classList).toHaveLength(1);
  const redColorClass = base.classList.item(0);

  // BaseOverride should not have red color class
  const override = wrapper.find(StyledBaseOverride).getDOMNode();
  expect(override.classList).toHaveLength(1);
  expect(override.classList).not.toContain(redColorClass);

  wrapper.unmount();
});

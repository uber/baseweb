/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-disable */
// @flow
import * as React from 'react';
import {mount} from 'enzyme';

import {
  styled,
  createThemedStyled,
  withStyle,
  createThemedWithStyle,
  useStyletron,
  createThemedUseStyletron,
} from '../styled.js';
import {
  withStyletronProvider,
  withThemeProvider,
} from '../../test/test-utils.js';
import {LightTheme} from '../../themes/index.js';

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

describe('styled flow', () => {
  test('it provides flow error if accessing property not defined in props type', () => {
    type P = {hello: string};
    const a = styled<P>('div', props => {
      console.log(props.hello);
      // $FlowFixMe
      console.log(props.world);
      return {color: 'blue'};
    });
  });

  test('it provides flow error if accessing property not defined in default theme type', () => {
    const a = styled<{}>('div', props => {
      console.log(props.$theme.colors.primary400);
      // $FlowFixMe
      console.log(props.$theme.colors.primary9000);
      return {color: 'blue'};
    });
  });

  test('it provides flow error if returning invalid style object', () => {
    const a = styled<{}>('div', props => {
      // $FlowFixMe
      return {invalid: 'true'};
    });
  });

  test('it provides expected flow error if base is react component', () => {
    function C(props) {
      return <div className={props.className}>test</div>;
    }

    type P = {hello: string};
    const a = styled<typeof C, P>(C, props => {
      console.log(props.hello);
      // $FlowFixMe
      console.log(props.world);
      return {color: 'red'};
    });
  });
});

describe('themedStyled flow', () => {
  test('it provides flow error if accessing property not defined in custom theme type', () => {
    type T = {colors: {custom400: string}};
    const themedStyled = createThemedStyled<T>();

    const a = themedStyled<{}>('div', props => {
      console.log(props.$theme.colors.custom400);
      // $FlowFixMe
      console.log(props.$theme.colors.custom9000);
      return {color: 'blue'};
    });
  });

  test('it provides props flow error using createThemedStyled', () => {
    type T = {colors: {custom400: string}};
    const themedStyled = createThemedStyled<T>();

    type P = {hello: string};
    const a = themedStyled<P>('div', props => {
      console.log(props.hello);
      // $FlowFixMe
      console.log(props.world);
      return {color: 'blue'};
    });
  });
});

describe('withStyle flow', () => {
  test('it provides flow error if accessing property not defined in props type', () => {
    type P = {hello: string};
    const a = styled<P>('div', props => {
      return {color: 'blue'};
    });

    type Q = {world: string};
    const b = withStyle<typeof a, Q>(a, props => {
      console.log(props.world);
      // $FlowFixMe
      console.log(props.hello);
      return {color: 'green'};
    });
  });

  test('it provides flow error if accessing property not defined in default theme type', () => {
    const a = styled<{}>('div', props => {
      console.log(props.$theme.colors.primary400);
      // $FlowFixMe
      console.log(props.$theme.colors.primary9000);
      return {color: 'blue'};
    });

    const b = withStyle<typeof a, {}>(a, props => {
      console.log(props.$theme.colors.primary400);
      // $FlowFixMe
      console.log(props.$theme.colors.primary9000);
      return {color: 'green'};
    });
  });

  test('it provides flow error if returning invalid style object', () => {
    const a = styled<{}>('div', props => {
      return {color: 'red'};
    });

    const b = withStyle<typeof a, {}>(a, props => {
      // $FlowFixMe
      return {invalid: 'true'};
    });
  });
});

describe('themedWithStyle flow', () => {
  test('it provides flow error if accessing property not defined in custom theme type', () => {
    type T = {colors: {custom400: string}};
    const themedStyled = createThemedStyled<T>();
    const themedWithStyle = createThemedWithStyle<T>();

    const a = themedStyled<{}>('div', props => {
      return {color: 'blue'};
    });

    const b = themedWithStyle<typeof a, {}>(a, props => {
      console.log(props.$theme.colors.custom400);
      // $FlowFixMe
      console.log(props.$theme.colors.custom9000);
      return {color: 'green'};
    });
  });

  test('it provides props flow error using createThemedStyled', () => {
    type T = {colors: {custom400: string}};
    const themedStyled = createThemedStyled<T>();
    const themedWithStyle = createThemedWithStyle<T>();

    const a = themedStyled<{}>('div', props => {
      return {color: 'blue'};
    });

    type P = {hello: string};
    const b = themedWithStyle<typeof a, P>(a, props => {
      console.log(props.hello);
      // $FlowFixMe
      console.log(props.world);
      return {color: 'green'};
    });
  });
});

describe('useStyletron flow', () => {
  test('it provides flow error if argument is not a StyleObject', () => {
    function A() {
      const [css] = useStyletron();
      // $FlowFixMe
      return <div className={css(false)}>hello</div>;
    }
  });

  test('it provides flow error if accessing property not defined in default theme type', () => {
    function A() {
      const [css, theme] = useStyletron();
      return (
        <div
          className={css({
            color: theme.colors.primary400,
            // $FlowFixMe
            backgroundColor: theme.colors.primary9000,
          })}
        >
          hello
        </div>
      );
    }
  });
});

describe('themedUseStyletron flow', () => {
  test('it provides flow error if argument is not a StyleObject', () => {
    type T = {colors: {custom400: string}};
    const themedUseStyletron = createThemedUseStyletron<T>();

    function A() {
      const [css] = themedUseStyletron();
      // $FlowFixMe
      return <div className={css(false)}>hello</div>;
    }
  });

  test('it provides flow error if accessing property not defined in default theme type', () => {
    function A() {
      type T = {colors: {custom400: string}};
      const themedUseStyletron = createThemedUseStyletron<T>();

      const [css, theme] = themedUseStyletron();
      return (
        <div
          className={css({
            color: theme.colors.custom400,
            // $FlowFixMe
            backgroundColor: theme.colors.custom9000,
          })}
        >
          hello
        </div>
      );
    }
  });
});

/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import * as React from 'react';
import {
  fireEvent,
  getByTestId,
  getByText,
  render,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect.js';
import {LightTheme} from '../../themes/index.js';
import {withOverrides} from '../overrides.js';
import type {OverrideObjectT} from '../overrides.js';
import ThemeProvider from '../../styles/theme-provider.js';
import BaseProvider from '../base-provider.js';

type withOverridesT = {
  overrides?: OverrideObjectT,
  forwardedRef?: React.Ref<any>,
  'data-testid'?: string,
};

class TestElement extends React.Component<withOverridesT> {
  render() {
    const overrides = this.props.overrides
      ? this.props.overrides
      : {props: {}, style: {}};
    return <div {...overrides.props} style={overrides.style} />;
  }
}
const TestComponent = withOverrides<withOverridesT, TestElement>(
  TestElement,
  'TestComponent',
);

describe('Global Overrides', () => {
  test('passes global overrides through ThemeProvider', () => {
    const {container} = render(
      // $FlowFixMe
      <ThemeProvider
        overrides={{
          TestComponent: {
            props: {
              'data-testid': 'global-overrides',
            },
            style: {
              color: 'red',
            },
          },
        }}
      >
        <TestComponent />
      </ThemeProvider>,
    );
    const testComponent = getByTestId(container, 'global-overrides');
    expect(testComponent).toBeTruthy();
    expect(testComponent).toHaveStyle('color: red');
  });
  test('passes global overrides through BaseProvider', () => {
    const {container} = render(
      <BaseProvider
        theme={LightTheme}
        overrides={{
          TestComponent: {
            // $FlowFixMe
            props: {
              'data-testid': 'global-overrides',
            },
            // $FlowFixMe
            style: {
              color: 'red',
            },
          },
        }}
      >
        <TestComponent />
      </BaseProvider>,
    );
    const testComponent = getByTestId(container, 'global-overrides');
    expect(testComponent).toBeTruthy();
    expect(testComponent).toHaveStyle('color: red');
  });
  test('local overrides replaces global overrides', () => {
    const {container} = render(
      // $FlowFixMe
      <BaseProvider
        overrides={{
          TestComponent: {
            props: {
              'data-testid': 'global-overrides',
            },
            style: {
              color: 'red',
              background: 'blue',
            },
          },
        }}
      >
        <TestComponent
          overrides={{
            props: {
              'data-testid': 'local-overrides',
            },
            style: {
              color: 'green',
            },
          }}
        />
      </BaseProvider>,
    );
    const testComponent = getByTestId(container, 'local-overrides');
    expect(testComponent).toBeTruthy();
    expect(testComponent).toHaveStyle('color: green');
    expect(testComponent).toHaveStyle('background: blue');
  });
  test('passes ref successfully', () => {
    /** Create nested forwardRefs */
    const TestElementRef = (props: {
      overrides?: OverrideObjectT,
      forwardedRef?: React.Ref<any>,
    }) => {
      return <input ref={props.forwardedRef}></input>;
    };
    const ForwardingElement = React.forwardRef<withOverridesT, HTMLElement>(
      (props: withOverridesT, ref) => (
        <TestElementRef {...props} forwardedRef={ref} />
      ),
    );
    const TestComponentRef = withOverrides(
      ForwardingElement,
      'ForwardingElement',
    );
    const ToRender = ({mockFn}: any) => {
      const ref = React.createRef();
      const handleClick = () => {
        if (!ref.current) return;
        mockFn();
        ref.current.textContent = 'called';
      };
      return (
        // $FlowFixMe
        <ThemeProvider
          overrides={{
            ForwardingElement: {
              props: {
                'data-testid': 'global-overrides',
              },
            },
          }}
        >
          {/* $FlowFixMe */}
          <TestComponentRef ref={ref} />
          <button
            onClick={() => {
              handleClick();
            }}
            data-testid="test-btn"
          ></button>
        </ThemeProvider>
      );
    };
    const mock = jest.fn();
    const {container} = render(<ToRender mockFn={mock}></ToRender>);
    fireEvent.click(getByTestId(container, 'test-btn'));
    expect(mock).toBeCalledTimes(1);
    expect(getByText(container, 'called')).toBeTruthy();
  });
});

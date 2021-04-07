/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import * as React from 'react';
import {getByTestId, getByText, render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {withOverrides} from '../overrides.js';
import type {OverrideT} from '../overrides';
import ThemeProvider from '../../styles/theme-provider.js';

describe('Global Overrides', () => {
  test('successfully passes global overrides', () => {
    // Mock behavior of baseui component
    const TestElement = (props: {overrides: OverrideT}) => {
      return (
        <div {...props.overrides.props} style={props.overrides.style}></div>
      );
    };
    const TestComponent = withOverrides(TestElement, 'TestComponent');
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
});

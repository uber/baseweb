/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {Tag, SIZE} from '../index.js';
import Alert from '../../icon/alert.js';
import ArrowLeft from '../../icon/arrow-left.js';
import ThemeProvider from '../../styles/theme-provider.js';
import {createTheme, lightThemePrimitives} from '../../index.js';

const themeWithIcons = createTheme(
  {
    ...lightThemePrimitives,
  },
  {
    icons: {
      Delete: ArrowLeft,
    },
  },
);

export default function Scenario() {
  return (
    <React.Fragment>
      <h2>No override</h2>
      <Tag size={SIZE.small}>Label</Tag>
      <br />
      <Tag size={SIZE.large}>Label</Tag>
      <br />
      <h2>Overriding icon via the component</h2>
      <Tag size={SIZE.small} overrides={{ActionIcon: {component: Alert}}}>
        Label
      </Tag>
      <br />
      <Tag size={SIZE.large} overrides={{ActionIcon: {component: Alert}}}>
        Label
      </Tag>
      <ThemeProvider theme={themeWithIcons}>
        <h2>Overriding icon via the theme</h2>
        <Tag size={SIZE.small}>Label</Tag>
        <br />
        <Tag size={SIZE.large}>Label</Tag>
        <h2>
          Overriding icon via the component (taking precedent over the theme
          override)
        </h2>
        <Tag size={SIZE.small} overrides={{ActionIcon: {component: Alert}}}>
          Label
        </Tag>
        <br />
        <Tag size={SIZE.large} overrides={{ActionIcon: {component: Alert}}}>
          Label
        </Tag>
      </ThemeProvider>
    </React.Fragment>
  );
}

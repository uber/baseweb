/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import { ThemeProvider, LightTheme } from '../../index.js';
import { Scenario as TableSemanticBuilder } from './table-semantic-builder.scenario.js';

const XSmallFilled = ({ title, size, color, ...props }) => {
  return (
    <svg title={title} width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M18.1 8.1l-2.2-2.2-3.9 4-3.9-4-2.2 2.2 4 3.9-4 3.9 2.2 2.2 3.9-4 3.9 4 2.2-2.2-4-3.9 4-3.9z"
        fill={color}
      />
    </svg>
  );
};

export function Scenario() {
  return (
    <ThemeProvider
      theme={{
        ...LightTheme,
        icons: {
          Blank: (p) => <XSmallFilled {...p} color="pink" />,
          ChevronDown: (p) => <XSmallFilled {...p} color="green" />,
          ChevronUp: (p) => <XSmallFilled {...p} color="blue" />,
        },
      }}
    >
      <TableSemanticBuilder />
    </ThemeProvider>
  );
}

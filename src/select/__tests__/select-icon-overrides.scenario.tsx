/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { ThemeProvider, LightTheme } from '../../index';
import { StatefulSelect, TYPE } from '../index';
import { IconProps } from '../../icon';

const options = [
  { id: 'AliceBlue', color: '#F0F8FF' },
  { id: 'AntiqueWhite', color: '#FAEBD7' },
  { id: 'Aqua', color: '#00FFFF' },
  { id: 'Aquamarine', color: '#7FFFD4' },
  { id: 'Azure', color: '#F0FFFF' },
  { id: 'Beige', color: '#F5F5DC' },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const XSmallFilled = ({ title, size, color, ...props }: IconProps) => {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <title>{title}</title>
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
          DeleteAlt: (p) => <XSmallFilled {...p} color="pink" />,
          TriangleDown: (p) => <XSmallFilled {...p} color="green" />,
          Search: (p) => <XSmallFilled {...p} color="blue" />,
        },
      }}
    >
      <StatefulSelect
        aria-label="Select a color"
        options={options}
        labelKey="id"
        valueKey="color"
        type={TYPE.search}
      />

      <StatefulSelect
        aria-label="Select a color"
        options={options}
        overrides={{ SelectArrow: (p) => <XSmallFilled {...p} color="orange" /> }}
        labelKey="id"
        valueKey="color"
      />

      <StatefulSelect
        aria-label="Select a color"
        options={options}
        labelKey="id"
        valueKey="color"
      />

      <StatefulSelect
        initialState={{ value: [options[0]] }}
        aria-label="Select a color"
        options={options}
        labelKey="id"
        valueKey="color"
      />

      <StatefulSelect
        initialState={{ value: [options[0]] }}
        aria-label="Select a color"
        options={options}
        labelKey="id"
        valueKey="color"
        overrides={{ ClearIcon: (p) => <XSmallFilled {...p} color="blue" /> }}
      />
    </ThemeProvider>
  );
}

/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { ThemeProvider } from '../../styles';
import { createLightTheme, lightThemePrimitives } from '../../themes';
import Upload from '../upload';
import Check from '../check';
import { IconProps } from '../';

// Simulate roughly how our own icons are distributed
const Triangle = React.forwardRef<SVGElement, IconProps>((props, ref) => {
  const { title, size = '1em', ...restProps } = props;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...restProps}
    >
      {title ? <title>{title}</title> : null}
      <path d="M20 19L12 5L4 19H20Z" fill="currentColor" />
    </svg>
  );
});
Triangle.displayName = 'Triangle';

const theme = createLightTheme(lightThemePrimitives, {
  icons: {
    Upload: Triangle,
  },
});

// Verify that we are not applying extraneous attributes (color/width/height)
// to our default icons. Also verify that custom icons do not recieve dollar prefixed
// props, either from Icon or from directly passing them.
export function Scenario() {
  return (
    <ThemeProvider theme={theme}>
      {/* A default icon */}
      <Check size={100} color="red" />
      {/* $ props */}
      <Check $size={100} $color="red" />
      {/* Overrides */}
      <Check
        overrides={{
          Svg: {
            style: { fill: 'red', height: '100px', width: '100px' },
          },
        }}
      />

      {/* A custom implementation */}

      <Upload
        size={100}
        color="red"
        // @ts-expect-error
        $testing="123"
        data-testing="123"
      />
    </ThemeProvider>
  );
}

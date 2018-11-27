/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import {LightTheme} from '../themes';

export function hexToRgb(hex: string = '', alpha: string = '1') {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function(m, r, g, b) {
    return r + r + g + g + b + b;
  });
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `rgba(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(
        result[3],
        16,
      )}, ${alpha})`
    : null;
}

export function gridMediaQueryStyles(style: string = '', value: string = '1') {
  let styles = {};
  Object.entries(LightTheme.grid).forEach(([baseName, baseValue]) => {
    const maxWidth = baseName.replace(/\D*/gi, '');
    const mediaQuery = `@media (min-width: ${maxWidth}px)`;
    styles[mediaQuery] = {
      // $FlowFixMe
      [style]: `calc(${value} * ${baseValue})`,
    };
  });
  return styles;
}

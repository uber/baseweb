/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import type {BorderT, Globals, LineStyle} from '../themes/types.js';

export function hexToRgb(hex: string = '', alpha: string = '1') {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
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

export const ellipsisText = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  wordWrap: 'normal',
};

export function expandBorderStyles(borderStyles: BorderT): {|
  borderTopStyle: Globals | LineStyle,
  borderTopWidth: string,
  borderTopColor: string,
  borderBottomWidth: string,
  borderBottomStyle: Globals | LineStyle,
  borderBottomColor: string,
  borderLeftWidth: string,
  borderLeftStyle: Globals | LineStyle,
  borderLeftColor: string,
  borderRightWidth: string,
  borderRightStyle: Globals | LineStyle,
  borderRightColor: string,
|} {
  return {
    borderTopWidth: borderStyles.borderWidth,
    borderTopStyle: borderStyles.borderStyle,
    borderTopColor: borderStyles.borderColor,
    borderBottomWidth: borderStyles.borderWidth,
    borderBottomStyle: borderStyles.borderStyle,
    borderBottomColor: borderStyles.borderColor,
    borderLeftWidth: borderStyles.borderWidth,
    borderLeftStyle: borderStyles.borderStyle,
    borderLeftColor: borderStyles.borderColor,
    borderRightWidth: borderStyles.borderWidth,
    borderRightStyle: borderStyles.borderStyle,
    borderRightColor: borderStyles.borderColor,
  };
}

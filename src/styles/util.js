/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import type {BorderT} from '../themes/types.js';

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

export const ellipsisText = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  wordWrap: 'normal',
};

export function expandBorderStyles({
  borderWidth,
  borderStyle,
  borderColor,
}: {
  borderWidth: $PropertyType<BorderT, 'borderWidth'> | null,
  borderStyle: $PropertyType<BorderT, 'borderStyle'> | null,
  borderColor: $PropertyType<BorderT, 'borderColor'> | null,
}) {
  return {
    borderTopWidth: borderWidth,
    borderTopStyle: borderStyle,
    borderTopColor: borderColor,
    borderBottomWidth: borderWidth,
    borderBottomStyle: borderStyle,
    borderBottomColor: borderColor,
    borderLeftWidth: borderWidth,
    borderLeftStyle: borderStyle,
    borderLeftColor: borderColor,
    borderRightWidth: borderWidth,
    borderRightStyle: borderStyle,
    borderRightColor: borderColor,
  };
}

export function expandBorderRadiusStyles(borderRadius: string | number | null) {
  return {
    borderTopLeftRadius: borderRadius,
    borderTopRightRadius: borderRadius,
    borderBottomRightRadius: borderRadius,
    borderBottomLeftRadius: borderRadius,
  };
}

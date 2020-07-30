/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

export const VARIANT = Object.freeze({
  solid: 'solid',
  light: 'light',
  outlined: 'outlined',
});

export const KIND = {
  neutral: 'neutral',
  primary: 'primary',
  accent: 'accent',
  positive: 'positive',
  warning: 'warning',
  negative: 'negative',
  custom: 'custom',
  // Primitive color tags
  // These are the Base approved tags going forwards
  // TODO(major): remove semantic tags
  black: 'black',
  red: 'red',
  orange: 'orange',
  yellow: 'yellow',
  green: 'green',
  blue: 'blue',
  purple: 'purple',
  brown: 'brown',
};

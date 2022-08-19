/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import type { StyledComponentArgs } from './types';

export { default as Icon } from './icon';
export { Svg as StyledSvg, getSvgStyles } from './styled-components';
export * from './icon-exports';
export * from './types';
/** @deprecated use StyledComponentArgs instead. To be removed in future versions.*/
export type StyledComponentArgsT = StyledComponentArgs;

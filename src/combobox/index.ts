/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import type { ComboboxProps } from './types';

export { SIZE } from '../input';

export { default as Combobox } from './combobox';
export {
  StyledRoot,
  StyledInputContainer,
  StyledListBox,
  StyledListItem,
} from './styled-components';
export * from './types';

/** @deprecated use ComboboxProps instead. To be removed in future versions.*/
export type PropsT = ComboboxProps;

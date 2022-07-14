/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import type { Optgroups, Options } from './types';
import { SelectProps } from '../../legacy-dts/select';

export { default as Select } from './select';
export { default as SingleSelect } from './single-select';
export { default as MultiSelect } from './multi-select';
export { default as SingleValue } from './value';
export { default as MultiValue } from './multi-value';
export { default as AutosizeInput } from './autosize-input';
export { default as SelectDropdown } from './dropdown';
export { default as StatefulSelect } from './stateful-select';
export { default as StatefulSelectContainer } from './stateful-select-container';
// Styled elements
export {
  StyledRoot,
  StyledControlContainer,
  StyledValueContainer,
  StyledPlaceholder,
  StyledSingleValue,
  StyledInputContainer,
  StyledInput,
  StyledInputSizer,
  StyledIconsContainer,
  StyledSelectArrow,
  StyledClearIcon,
  StyledSearchIconContainer,
  StyledDropdownContainer,
  StyledDropdown,
  StyledDropdownListItem,
  StyledOptionContent,
} from './styled-components';
export { default as filterOptions } from './utils/default-filter-options';
export { SIZE, TYPE, STATE_CHANGE_TYPE } from './constants';
export * from './types';
export type { SelectLocale } from './locale';
/** @deprecated use Optgroups instead. To be removed in future versions.*/
export type OptgroupsT = Optgroups;
/** @deprecated use Options instead. To be removed in future versions.*/
export type OptionsT = Options;

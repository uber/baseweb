/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

export { default as StatefulCheckbox } from './stateful-checkbox';
export { default as StatefulContainer } from './stateful-checkbox-container';
export { default as Checkbox } from './checkbox';
// Styled elements
export {
  Root as StyledRoot,
  Checkmark as StyledCheckmark,
  CheckmarkContainer as StyledCheckmarkContainer,
  Label as StyledLabel,
  Input as StyledInput,
} from './styled-components';

export { STATE_TYPE, LABEL_PLACEMENT } from './constants';

// Flow
export * from './types';

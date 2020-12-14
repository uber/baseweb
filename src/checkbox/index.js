/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

export {default as StatefulCheckbox} from './stateful-checkbox.js';
export {default as StatefulContainer} from './stateful-checkbox-container.js';
export {default as Checkbox} from './checkbox.js';
// Styled elements
export {
  Root as StyledRoot,
  Checkmark as StyledCheckmark,
  Label as StyledLabel,
  Input as StyledInput,
  Toggle as StyledToggle,
  ToggleInner as StyledToggleInner,
  ToggleTrack as StyledToggleTrack,
} from './styled-components.js';

export {STATE_TYPE, STYLE_TYPE, LABEL_PLACEMENT} from './constants.js';

// Flow
export type * from './types.js';

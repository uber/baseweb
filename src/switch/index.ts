/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

export { default as StatefulSwitch } from './stateful-switch';
export { default as StatefulContainer } from './stateful-switch-container';
export { default as Switch } from './switch';
// Styled elements
export {
  Root as StyledRoot,
  Toggle as StyledToggle,
  ToggleTrack as StyledToggleTrack,
  Label as StyledLabel,
  Input as StyledInput,
} from './styled-components';

export { STATE_TYPE, LABEL_PLACEMENT, SIZE } from './constants';

export * from './types';

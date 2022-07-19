/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import type { SharedStylePropsArg } from './types';

export { default as Accordion } from './accordion';
export { default as Panel } from './panel';
export { default as StatefulPanel } from './stateful-panel';
export { default as StatefulPanelContainer } from './stateful-panel-container';
export { default as StatelessAccordion } from './stateless-accordion';
// Constants
export { STATE_CHANGE_TYPE } from './constants';
// Styled elements
export {
  Root as StyledRoot,
  PanelContainer as StyledPanelContainer,
  Header as StyledHeader,
  Content as StyledContent,
  ContentAnimationContainer as StyledContentAnimationContainer,
  ToggleIcon as StyledToggleIcon,
  ToggleIconGroup as StyledToggleIconGroup,
} from './styled-components';
// Flow
export * from './types';
export type { AccordionLocale } from './locale';
/** @deprecated use SharedStylePropsArg instead. To be removed in future versions.*/
export type SharedProps = SharedStylePropsArg;

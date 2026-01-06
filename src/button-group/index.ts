/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import type { StatefulButtonGroupProps } from './types';
import { KIND as BASE_BUTTON_KIND, BUTTON_GROUP_EXCLUSIVE_KINDS } from '../button';

export const KIND = {
  ...BASE_BUTTON_KIND,
  ...BUTTON_GROUP_EXCLUSIVE_KINDS,
} as const;

export { default as ButtonGroup } from './button-group';
export { default as StatefulButtonGroup } from './stateful-button-group';
export { default as StatefulContainer } from './stateful-container';

// Constants
export { SIZE, SHAPE } from '../button';
export { MODE, STATE_CHANGE_TYPE, PADDING } from './constants';

// Styled elements
export { StyledRoot } from './styled-components';

// Types
export * from './types';
export type { ButtonGroupLocale } from './locale';
/** @deprecated To be removed in future versions */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type InitialState = StatefulButtonGroupProps['initialState'];

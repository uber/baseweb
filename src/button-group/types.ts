/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import type * as React from 'react';

import type { SIZE, SHAPE, KIND } from '../button';
import type { Override } from '../helpers/overrides';
import type { MODE, STATE_CHANGE_TYPE } from './constants';

// button-group
export type ButtonGroupProps = {
  /** Accessible label. */
  ariaLabel?: string;
  'aria-label'?: string;
  /** Set of more than one `Button` components */
  children: Array<React.ReactNode>;
  /** Defines if the button group is disabled. */
  disabled?: boolean;
  /**
   * Use the `mode` prop to render toggleable Buttons:
   * the value `radio` will cause Buttons to behave like radio buttons,
   * the value `checkbox` will cause Buttons to behave like checkboxes.
   */
  mode?: typeof MODE[keyof typeof MODE];
  /**
   * Called with click events from children. If a child button has its
   * own click handler, the local handler will be called first, then
   * this handler will trigger.
   */
  onClick?: ClickHandler;
  overrides?: ButtonGroupOverrides;
  /**
   * Index or array of indices of the selected Button(s).
   * Primarily for use with controlled components with a `mode` prop defined.
   */
  selected?: number | Array<number>;
  /** Defines the shape of the buttons in the button group. */
  shape?: typeof SHAPE[keyof typeof SHAPE];
  /** Defines the size of the buttons in the button group. */
  size?: typeof SIZE[keyof typeof SIZE];
  /** Defines the `kind` of the buttons in the group */
  kind?: typeof KIND[keyof typeof KIND];
};

type ButtonGroupOverrides = {
  Root?: Override;
};

// stateful-group
export type StatefulButtonGroupProps = Omit<
  {
    initialState?: {
      selected: number | Array<number>;
    };
    stateReducer?: StateReducer;
  } & ButtonGroupProps,
  'selected'
>;

// stateful-container
export type StatefulContainerProps = {
  children: (
    props: {
      onClick: ClickHandler;
      selected: number | Array<number>;
    } & Omit<ButtonGroupProps, 'children'>
  ) => React.ReactNode;
} & Omit<StatefulButtonGroupProps, 'children'>;

export type State = {
  selected: Array<number>;
};

export type StateReducer = (
  stateType: typeof STATE_CHANGE_TYPE[keyof typeof STATE_CHANGE_TYPE],
  nextState: State,
  currentState: State
) => State;

// general
type ClickHandler = (event: React.SyntheticEvent<HTMLButtonElement>, index: number) => unknown;

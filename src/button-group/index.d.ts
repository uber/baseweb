import * as React from 'react';
import {StyledFn, StyletronComponent} from 'styletron-react';
import {SHAPE, SIZE, KIND} from '../button';
import {Override} from '../overrides';

export interface MODE {
  checkbox: 'checkbox';
  radio: 'radio';
}
export interface STATE_CHANGE_TYPE {
  change: 'change';
}

export const StyledRoot: StyletronComponent<any>;

export interface ButtonGroupOverrides {
  Root?: Override<any>;
}

export interface ButtonGroupProps {
  ariaLabel?: string;
  children: React.ReactNode;
  disabled?: boolean;
  mode?: MODE[keyof MODE];
  onClick?: (event: React.MouseEvent<HTMLButtonElement>, index: number) => any;
  overrides?: ButtonGroupOverrides;
  selected?: number | number[];
  shape?: SHAPE[keyof SHAPE];
  size?: SIZE[keyof SIZE];
  kind?: KIND[keyof KIND];
}

export const ButtonGroup: React.FC<ButtonGroupProps>;

export interface InitialState {
  selected: number | number[];
}

export interface State {
  selected: number[];
}

export interface StatefulButtonGroupProps extends ButtonGroupProps {
  initialState?: InitialState;
  stateReducer?: (
    stateType: STATE_CHANGE_TYPE,
    nextState: State,
    currentState: State,
  ) => State;
}

export const StatefulButtonGroup: React.FC<StatefulButtonGroupProps>;

export class StatefulContainer extends React.Component<
  StatefulButtonGroupProps,
  State
> {
  changeState(nextState: State): void;
  onClick(event: React.MouseEvent<HTMLButtonElement>, index: number): void;
}

export const MODE: MODE;
export const STATE_CHANGE_TYPE: STATE_CHANGE_TYPE;

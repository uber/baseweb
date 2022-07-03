import * as React from 'react';
import { StyletronComponent } from 'styletron-react';
import { SHAPE, SIZE, KIND } from '../button';
import { Override } from '../overrides';

export { SHAPE, SIZE };

export declare const MODE: {
  checkbox: 'checkbox';
  radio: 'radio';
};

export declare const STATE_CHANGE_TYPE: {
  change: 'change';
};

export declare const StyledRoot: StyletronComponent<any>;

export interface ButtonGroupOverrides {
  Root?: Override<any>;
}

export interface ButtonGroupProps {
  ariaLabel?: string;
  'aria-label'?: string;
  children: React.ReactNode;
  disabled?: boolean;
  mode?: typeof MODE[keyof typeof MODE];
  onClick?: (event: React.MouseEvent<HTMLButtonElement>, index: number) => any;
  overrides?: ButtonGroupOverrides;
  selected?: number | number[];
  shape?: typeof SHAPE[keyof typeof SHAPE];
  size?: typeof SIZE[keyof typeof SIZE];
  kind?: typeof KIND[keyof typeof KIND];
}

export declare const ButtonGroup: React.FC<ButtonGroupProps>;

export interface InitialState {
  selected: number | number[];
}

export interface State {
  selected: number[];
}

export interface StatefulButtonGroupProps extends ButtonGroupProps {
  initialState?: InitialState;
  stateReducer?: (
    stateType: typeof STATE_CHANGE_TYPE[keyof typeof STATE_CHANGE_TYPE],
    nextState: State,
    currentState: State
  ) => State;
}

export declare const StatefulButtonGroup: React.FC<StatefulButtonGroupProps>;

export class StatefulContainer extends React.Component<StatefulButtonGroupProps, State> {
  changeState(nextState: State): void;
  onClick(event: React.MouseEvent<HTMLButtonElement>, index: number): void;
}

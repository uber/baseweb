import * as React from 'react';
import {StyletronComponent} from 'styletron-react';
import {Override} from '../overrides';

export interface STATE_CHANGE_TYPE {
  change: 'change';
}

export interface State {
  value: number[];
}

export type StateReducer = (
  stateType: string,
  nextState: State,
  currentState: State,
) => State;

export interface SliderOverrides {
  Root?: Override<SharedProps>;
  Track?: Override<SharedProps>;
  InnerTrack?: Override<SharedProps>;
  Tick?: Override<SharedProps>;
  TickBar?: Override<SharedProps>;
  Thumb?: Override<SharedProps>;
  InnerThumb?: Override<SharedProps>;
  ThumbValue?: Override<SharedProps>;
}

export interface SliderProps {
  value: number[];
  min?: number;
  max?: number;
  step?: number;
  overrides?: SliderOverrides;
  disabled?: boolean;
  onChange?: (e: State) => any;
  onFinalChange?: (e: State) => any;
}

export interface StatefulSliderProps {
  overrides?: SliderOverrides;
  initialState?: State;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (e: State) => any;
  onFinalChange?: (e: State) => any;
}

export interface StatefulContainerProps {
  overrides?: SliderOverrides;
  children?: React.ReactNode;
  min?: number;
  max?: number;
  step?: number;
  initialState?: State;
  stateReducer?: StateReducer;
  onChange?: (e: State) => any;
  onFinalChange?: (e: State) => any;
}

export type SharedProps = {
  $disabled: boolean;
  $isDragged: boolean;
  $max: number;
  $min: number;
  $thumbIndex: number;
  $value: Array<number>;
};

export const Slider: React.FC<SliderProps>;
export const StatefulSlider: React.FC<StatefulSliderProps>;
export class StatefulContainer extends React.Component<
  StatefulContainerProps,
  State
> {
  onChange(params: State): any;
  onFinalChange?: (params: State) => any;
  internalSetState(type: 'change', {value}: State): void;
}

export const StyledRoot: StyletronComponent<any>;
export const StyledTrack: StyletronComponent<any>;
export const StyledInnerTrack: StyletronComponent<any>;
export const StyledThumb: StyletronComponent<any>;
export const StyledInnerThumb: StyletronComponent<any>;
export const StyledTick: StyletronComponent<any>;
export const StyledTickBar: StyletronComponent<any>;

export const STATE_CHANGE_TYPE: STATE_CHANGE_TYPE;

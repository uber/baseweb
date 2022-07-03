import * as React from 'react';
import { StyletronComponent } from 'styletron-react';
import { Override } from '../overrides';

export declare const STATE_CHANGE_TYPE: {
  change: 'change';
};

export interface State {
  value: number[];
}

export type StateReducer = (stateType: string, nextState: State, currentState: State) => State;

export interface SliderOverrides {
  Root?: Override<SharedProps>;
  Track?: Override<SharedProps>;
  InnerTrack?: Override<SharedProps>;
  Tick?: Override<SharedProps>;
  TickBar?: Override<SharedProps>;
  Thumb?: Override<SharedProps>;
  InnerThumb?: Override<SharedProps>;
  ThumbValue?: Override<SharedProps>;
  Mark?: Override<SharedProps>;
}

export interface SliderProps {
  value: number[];
  min?: number;
  max?: number;
  step?: number;
  overrides?: SliderOverrides;
  disabled?: boolean;
  marks?: boolean;
  onChange?: (e: State) => any;
  onFinalChange?: (e: State) => any;
  persistentThumb?: boolean;
  valueToLabel?: (value: number) => React.ReactNode;
}

export interface StatefulSliderProps {
  overrides?: SliderOverrides;
  initialState?: State;
  min?: number;
  max?: number;
  step?: number;
  marks?: boolean;
  onChange?: (e: State) => any;
  onFinalChange?: (e: State) => any;
  persistentThumb?: boolean;
  valueToLabel?: (value: number) => React.ReactNode;
}

export interface StatefulContainerProps {
  overrides?: SliderOverrides;
  children?: React.ReactNode;
  min?: number;
  max?: number;
  step?: number;
  marks?: boolean;
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
  $marks: boolean;
};

export declare const Slider: React.FC<SliderProps>;
export declare const StatefulSlider: React.FC<StatefulSliderProps>;
export class StatefulContainer extends React.Component<StatefulContainerProps, State> {
  onChange(params: State): any;
  onFinalChange?: (params: State) => any;
  internalSetState(type: 'change', { value }: State): void;
}

export declare const StyledRoot: StyletronComponent<any>;
export declare const StyledTrack: StyletronComponent<any>;
export declare const StyledInnerTrack: StyletronComponent<any>;
export declare const StyledThumb: StyletronComponent<any>;
export declare const StyledInnerThumb: StyletronComponent<any>;
export declare const StyledTick: StyletronComponent<any>;
export declare const StyledTickBar: StyletronComponent<any>;
export declare const StyledMark: StyletronComponent<any>;

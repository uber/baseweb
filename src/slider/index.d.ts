import * as React from 'react';
import {StyletronComponent} from 'styletron-react';
import {Override} from '../overrides';

export interface STATE_CHANGE_TYPE {
  change: 'change';
}

type SliderValue = number | number[];

export interface SliderState {
  value: SliderValue;
}

export type StateReducer = (
  stateType: string,
  nextState: SliderState,
  currentState: SliderState,
) => SliderState;

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
  value: SliderValue;
  min?: number;
  max?: number;
  step?: number;
  overrides?: SliderOverrides;
  disabled?: boolean;
  marks?: boolean;
  onChange?: (e: SliderState) => any;
  onFinalChange?: (e: SliderState) => any;
}

export interface StatefulSliderProps {
  overrides?: SliderOverrides;
  initialState?: SliderState;
  min?: number;
  max?: number;
  step?: number;
  marks?: boolean;
  onChange?: (e: SliderState) => any;
  onFinalChange?: (e: SliderState) => any;
}

export interface StatefulContainerProps {
  overrides?: SliderOverrides;
  children?: React.ReactNode;
  min?: number;
  max?: number;
  step?: number;
  marks?: boolean;
  initialState?: SliderState;
  stateReducer?: StateReducer;
  onChange?: (e: SliderState) => any;
  onFinalChange?: (e: SliderState) => any;
}

export type SharedProps = {
  $disabled: boolean;
  $isDragged: boolean;
  $max: number;
  $min: number;
  $thumbIndex: number;
  $value: SliderValue;
  $marks: boolean;
};

export const Slider: React.FC<SliderProps>;
export const StatefulSlider: React.FC<StatefulSliderProps>;
export class StatefulContainer extends React.Component<
  StatefulContainerProps,
  SliderState
> {
  onChange(params: SliderState): any;
  onFinalChange?: (params: SliderState) => any;
  internalSetState(type: 'change', {value}: SliderState): void;
}

export const StyledRoot: StyletronComponent<any>;
export const StyledTrack: StyletronComponent<any>;
export const StyledInnerTrack: StyletronComponent<any>;
export const StyledThumb: StyletronComponent<any>;
export const StyledInnerThumb: StyletronComponent<any>;
export const StyledTick: StyletronComponent<any>;
export const StyledTickBar: StyletronComponent<any>;
export const StyledMark: StyletronComponent<any>;

export const STATE_CHANGE_TYPE: STATE_CHANGE_TYPE;

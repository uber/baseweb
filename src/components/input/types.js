// @flow
import * as React from 'react';
import type {OverrideT} from '../../helpers/overrides';
import {STATE_CHANGE_TYPE, ADJOINED, SIZE} from './constants';

// function withEnhancedTypes<Props, Component: React.ComponentType<Props>>(
//   WrappedComponent: Component
// ): React.ComponentType<React.ElementConfig<Component>> {
//   return props => <WrappedComponent {...props} />;
// }
// export {withEnhancedTypes};

export type AdjoinedT = $Keys<typeof ADJOINED>;

export type SizeT = $Keys<typeof SIZE>;

export type StateTypeT = $Keys<typeof STATE_CHANGE_TYPE>;

export type InternalStateT = {
  isFocused?: boolean,
};

export type StateT = {
  value?: string,
};

export type StateReducerT = (
  stateType: StateTypeT,
  nextState: StateT,
  currentState: StateT,
) => StateT;

export type PropsT = mixed;

export type BaseInputComponentsT = {
  InputContainer?: OverrideT<PropsT>,
  Input?: OverrideT<PropsT>,
  // TODO: Next two seems like shouldn't be in components prop
  Before?: OverrideT<PropsT>,
  After?: OverrideT<PropsT>,
};

export type InputComponentsT = BaseInputComponentsT & {
  Root?: OverrideT<PropsT>,
  Label?: OverrideT<PropsT>,
  StartEnhancer?: OverrideT<PropsT>,
  EndEnhancer?: OverrideT<PropsT>,
  Caption?: OverrideT<PropsT>,
};

export type BaseInputPropsT = {
  adjoined: AdjoinedT,
  autoFocus: boolean,
  disabled: boolean,
  error: boolean | React.Node | ((props: PropsT) => React.Node),
  id: string,
  inputRef: {current: ?React.ElementRef<'input'>},
  onBlur: (e: SyntheticEvent<HTMLInputElement>) => void,
  onChange: (e: SyntheticEvent<HTMLInputElement>) => void,
  onFocus: (e: SyntheticFocusEvent<HTMLInputElement>) => void,
  overrides: BaseInputComponentsT,
  placeholder: string,
  required: boolean,
  size: SizeT,
  type: string,
  value: string,
};

export type InputPropsT = {
  ...BaseInputPropsT,
  overrides: InputComponentsT,
  label: ?(React.Node | ((props: PropsT) => React.Node)),
  caption: ?(React.Node | ((props: PropsT) => React.Node)),
  startEnhancer: ?(React.Node | ((props: PropsT) => React.Node)),
  endEnhancer: ?(React.Node | ((props: PropsT) => React.Node)),
  onFocus: (e: SyntheticFocusEvent<HTMLInputElement>) => void,
  onBlur: (e: SyntheticEvent<HTMLInputElement>) => void,
};

export type StatefulContainerPropsT = {
  children: (props: PropsT) => React.Node,
  initialState?: StateT,
  stateReducer: StateReducerT,
  onChange: (e: SyntheticEvent<HTMLInputElement>) => void,
};

type OmitPropsT = {
  overrides: InputComponentsT,
  children: ?(props: PropsT) => React.Node,
};

type FullStPropsT = InputPropsT & StatefulContainerPropsT;

type StInputPropsDiffT = $Diff<FullStPropsT, OmitPropsT>;

export type StatefulInputPropsT = {
  ...StInputPropsDiffT,
  overrides?: InputComponentsT,
};

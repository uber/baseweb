// @flow
import * as React from 'react';
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

export type ComponentOverridesT =
  | {
      component?: ?React.ComponentType<PropsT>,
      props?: ?{},
      style?: ?{},
    }
  | React.ComponentType<PropsT>;

export type BaseInputComponentsT = {
  InputContainer?: ComponentOverridesT,
  Input?: ComponentOverridesT,
  // TODO: Next two seems like shouldn't be in components prop
  Before?: ComponentOverridesT,
  After?: ComponentOverridesT,
};

export type InputComponentsT = BaseInputComponentsT & {
  Root?: ComponentOverridesT,
  Label?: ComponentOverridesT,
  StartEnhancer?: ComponentOverridesT,
  EndEnhancer?: ComponentOverridesT,
  Caption?: ComponentOverridesT,
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
  override: BaseInputComponentsT,
  placeholder: string,
  required: boolean,
  size: SizeT,
  type: string,
  value: string,
};

export type InputPropsT = {
  ...BaseInputPropsT,
  override: InputComponentsT,
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
  override: InputComponentsT,
  children: ?(props: PropsT) => React.Node,
};

type FullStPropsT = InputPropsT & StatefulContainerPropsT;

type StInputPropsDiffT = $Diff<FullStPropsT, OmitPropsT>;

export type StatefulInputPropsT = {
  ...StInputPropsDiffT,
  override?: InputComponentsT,
};

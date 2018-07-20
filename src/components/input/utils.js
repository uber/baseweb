// @flow
import type {
  InputPropsT,
  BaseInputPropsT,
  InternalStateT,
  ComponentOverridesT,
  PropsT,
} from './types';

export function getSharedProps(
  props: BaseInputPropsT | InputPropsT,
  state: InternalStateT,
) {
  const {disabled, error, adjoined, size, required} = props;
  const {isFocused} = state;
  return {
    $isFocused: isFocused,
    $disabled: disabled,
    $error: error,
    $adjoined: adjoined,
    $size: size,
    $required: required,
  };
}

export function getComponent(
  override: ?ComponentOverridesT,
  defaultComponent: React.ComponentType<PropsT>,
): React.ComponentType<PropsT> {
  if (override && typeof override === 'object') {
    return override.component || defaultComponent;
  }
  return override || defaultComponent;
}

export function getComponentProps(override: ?ComponentOverridesT) {
  if (override && typeof override === 'object') {
    return {
      // $FlowFixMe
      ...override.props,
      // $FlowFixMe
      $style: override.style,
    };
  }
  return {};
}

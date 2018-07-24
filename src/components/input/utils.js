// @flow
import type {InputPropsT, BaseInputPropsT, InternalStateT} from './types';

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

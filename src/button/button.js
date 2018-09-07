// @flow
import * as React from 'react';
import {
  BaseButton as StyledBaseButton,
  StartEnhancer as StyledStartEnhancer,
  EndEnhancer as StyledEndEnhancer,
} from './styled-components';
import {getOverrideObject} from '../helpers/overrides';
import {KIND, SHAPE, SIZE} from './constants';

import type {ButtonPropsT} from './types';

export default function Button({
  children,
  disabled,
  startEnhancer,
  endEnhancer,
  overrides = {},
  size = SIZE.default,
  kind = KIND.primary,
  shape = SHAPE.square,
  ...restProps
}: ButtonPropsT) {
  // Base UI override logic goes here
  const {component: BaseButton, props: baseButtonProps} = getOverrideObject(
    overrides.BaseButton,
    StyledBaseButton,
  );
  const {
    component: StartEnhancer,
    props: startEnhancerProps,
  } = getOverrideObject(overrides.StartEnhancer, StyledStartEnhancer);
  const {component: EndEnhancer, props: endEnhancerProps} = getOverrideObject(
    overrides.EndEnhancer,
    StyledEndEnhancer,
  );
  return (
    <BaseButton
      disabled={disabled}
      $size={size}
      $kind={kind}
      $shape={shape}
      {...baseButtonProps}
      {...restProps}
    >
      {startEnhancer && (
        <StartEnhancer {...startEnhancerProps}>
          {typeof startEnhancer === 'function'
            ? startEnhancer()
            : startEnhancer}
        </StartEnhancer>
      )}
      {children}
      {endEnhancer && (
        <EndEnhancer {...endEnhancerProps}>
          {typeof endEnhancer === 'function' ? endEnhancer() : endEnhancer}
        </EndEnhancer>
      )}
    </BaseButton>
  );
}

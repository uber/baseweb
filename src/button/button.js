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
  size,
  kind,
  shape,
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
  const sharedProps = {
    $size: size,
    $kind: kind,
    $shape: shape,
  };
  return (
    <BaseButton
      disabled={disabled}
      {...sharedProps}
      {...restProps}
      {...baseButtonProps}
    >
      {startEnhancer && (
        <StartEnhancer {...sharedProps} {...startEnhancerProps}>
          {typeof startEnhancer === 'function'
            ? startEnhancer()
            : startEnhancer}
        </StartEnhancer>
      )}
      {children}
      {endEnhancer && (
        <EndEnhancer {...sharedProps} {...endEnhancerProps}>
          {typeof endEnhancer === 'function' ? endEnhancer() : endEnhancer}
        </EndEnhancer>
      )}
    </BaseButton>
  );
}

Button.defaultProps = {
  overrides: {},
  size: SIZE.default,
  kind: KIND.primary,
  shape: SHAPE.default,
};

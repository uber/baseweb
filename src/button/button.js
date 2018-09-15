/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {
  BaseButton as StyledBaseButton,
  StartEnhancer as StyledStartEnhancer,
  EndEnhancer as StyledEndEnhancer,
  LoadingSpinner as StyledLoadingSpinner,
} from './styled-components';
import {getOverrideObject} from '../helpers/overrides';
import {KIND, SHAPE, SIZE} from './constants';

import type {ButtonPropsT} from './types';

type SharedPropsT = {
  $size: $Keys<typeof SIZE>,
  $kind: $Keys<typeof KIND>,
  $shape: $Keys<typeof SHAPE>,
  $isLoading: boolean,
};
function getLoadingSpinnerEnhancer(sharedProps: SharedPropsT) {
  return <StyledLoadingSpinner {...sharedProps} />;
}

export default function Button({
  children,
  disabled,
  startEnhancer,
  endEnhancer,
  overrides,
  size,
  kind,
  shape,
  isLoading,
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
  const overrideEndEnhancer = endEnhancer
    ? endEnhancer
    : isLoading && shape === SHAPE.default
      ? getLoadingSpinnerEnhancer
      : null;
  const sharedProps = {
    $size: size,
    $kind: kind,
    $shape: shape,
    $isLoading: isLoading,
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
            ? startEnhancer(sharedProps)
            : startEnhancer}
        </StartEnhancer>
      )}
      {children}
      {overrideEndEnhancer && (
        <EndEnhancer {...sharedProps} {...endEnhancerProps}>
          {typeof overrideEndEnhancer === 'function'
            ? overrideEndEnhancer(sharedProps)
            : overrideEndEnhancer}
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
  isLoading: false,
  disabled: false,
};

/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {
  StartEnhancer as StyledStartEnhancer,
  EndEnhancer as StyledEndEnhancer,
} from './styled-components.js';
import {getSharedProps} from './utils.js';
import {getOverrides} from '../helpers/overrides.js';
import {KIND, SHAPE, SIZE} from './constants.js';

import type {ButtonPropsT} from './types.js';

export default function ButtonInternals(props: ButtonPropsT) {
  const {children, overrides, startEnhancer, endEnhancer} = props;
  const [StartEnhancer, startEnhancerProps] = getOverrides(
    overrides.StartEnhancer,
    StyledStartEnhancer,
  );
  const [EndEnhancer, endEnhancerProps] = getOverrides(
    overrides.EndEnhancer,
    StyledEndEnhancer,
  );
  const sharedProps = getSharedProps(props);
  return (
    <React.Fragment>
      {startEnhancer && (
        <StartEnhancer {...sharedProps} {...startEnhancerProps}>
          {typeof startEnhancer === 'function'
            ? startEnhancer(sharedProps)
            : startEnhancer}
        </StartEnhancer>
      )}
      {children}
      {endEnhancer && (
        <EndEnhancer {...sharedProps} {...endEnhancerProps}>
          {typeof endEnhancer === 'function'
            ? endEnhancer(sharedProps)
            : endEnhancer}
        </EndEnhancer>
      )}
    </React.Fragment>
  );
}

ButtonInternals.defaultProps = {
  overrides: {},
  size: SIZE.default,
  kind: KIND.primary,
  shape: SHAPE.default,
  isLoading: false,
  disabled: false,
};

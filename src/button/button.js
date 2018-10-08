/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {
  BaseButton as StyledBaseButton,
  LoadingSpinner as StyledLoadingSpinner,
  LoadingSpinnerContainer as StyledLoadingSpinnerContainer,
} from './styled-components';
import {getSharedProps} from './utils';
import ButtonInternals from './button-internals';
import {getOverrides} from '../helpers/overrides';

import type {ButtonPropsT} from './types';

export default function Button(props: ButtonPropsT) {
  const {
    overrides,
    size,
    kind,
    shape,
    isLoading,
    // Removing from restProps
    startEnhancer,
    endEnhancer,
    children,
    ...restProps
  } = props;
  // Get overrides
  const [BaseButton, baseButtonProps] = getOverrides(
    overrides.BaseButton,
    StyledBaseButton,
  );
  const [LoadingSpinner, loadingSpinnerProps] = getOverrides(
    overrides.LoadingSpinner,
    StyledLoadingSpinner,
  );
  const [LoadingSpinnerContainer, loadingSpinnerContainerProps] = getOverrides(
    overrides.LoadingSpinnerContainer,
    StyledLoadingSpinnerContainer,
  );
  const sharedProps = getSharedProps(props);
  return (
    <BaseButton {...sharedProps} {...restProps} {...baseButtonProps}>
      {isLoading ? (
        <React.Fragment>
          {/* This is not meant to be overridable by users */}
          <div style={{opacity: 0, display: 'flex'}}>
            <ButtonInternals {...props} />
          </div>
          <LoadingSpinnerContainer {...loadingSpinnerContainerProps}>
            <LoadingSpinner {...sharedProps} {...loadingSpinnerProps} />
          </LoadingSpinnerContainer>
        </React.Fragment>
      ) : (
        <ButtonInternals {...props} />
      )}
    </BaseButton>
  );
}

Button.defaultProps = {...ButtonInternals.defaultProps};

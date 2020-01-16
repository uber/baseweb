/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {
  BaseButton as StyledBaseButton,
  LoadingSpinner as StyledLoadingSpinner,
  LoadingSpinnerContainer as StyledLoadingSpinnerContainer,
} from './styled-components.js';
import {getSharedProps} from './utils.js';
import ButtonInternals from './button-internals.js';
import {defaultProps} from './default-props.js';
import {getOverrides} from '../helpers/overrides.js';

import type {ButtonPropsT} from './types.js';

// eslint-disable-next-line flowtype/no-weak-types
class Button extends React.Component<ButtonPropsT & {forwardedRef: any}> {
  static defaultProps = defaultProps;

  internalOnClick = (...args: *) => {
    const {isLoading, onClick} = this.props;
    if (isLoading) {
      return;
    }
    onClick && onClick(...args);
  };

  render() {
    const {
      overrides = {},
      size,
      kind,
      shape,
      isLoading,
      isSelected,
      // Removing from restProps
      startEnhancer,
      endEnhancer,
      children,
      forwardedRef,
      ...restProps
    } = this.props;
    // Get overrides
    const [BaseButton, baseButtonProps] = getOverrides(
      overrides.BaseButton,
      StyledBaseButton,
    );
    const [LoadingSpinner, loadingSpinnerProps] = getOverrides(
      overrides.LoadingSpinner,
      StyledLoadingSpinner,
    );
    const [
      LoadingSpinnerContainer,
      loadingSpinnerContainerProps,
    ] = getOverrides(
      overrides.LoadingSpinnerContainer,
      StyledLoadingSpinnerContainer,
    );
    const sharedProps = getSharedProps(this.props);
    return (
      <BaseButton
        ref={forwardedRef}
        data-baseweb="button"
        {...sharedProps}
        {...restProps}
        {...baseButtonProps}
        // Applies last to override passed in onClick
        onClick={this.internalOnClick}
      >
        {isLoading ? (
          <React.Fragment>
            {/* This is not meant to be overridable by users */}
            <div style={{opacity: 0, display: 'flex'}}>
              <ButtonInternals {...this.props} />
            </div>
            <LoadingSpinnerContainer {...loadingSpinnerContainerProps}>
              <LoadingSpinner {...sharedProps} {...loadingSpinnerProps} />
            </LoadingSpinnerContainer>
          </React.Fragment>
        ) : (
          <ButtonInternals {...this.props} />
        )}
      </BaseButton>
    );
  }
}

const ForwardedButton = React.forwardRef<ButtonPropsT, HTMLButtonElement>(
  (props: ButtonPropsT, ref) => <Button forwardedRef={ref} {...props} />,
);
ForwardedButton.displayName = 'Button';
export default ForwardedButton;

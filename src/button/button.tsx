/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import {
  BaseButton as StyledBaseButton,
  LoadingSpinner as StyledLoadingSpinner,
  LoadingSpinnerContainer as StyledLoadingSpinnerContainer,
} from './styled-components';
import { getSharedProps } from './utils';
import ButtonInternals from './button-internals';
import { defaultProps } from './default-props';
import { getOverrides } from '../helpers/overrides';
import { isFocusVisible, forkFocus, forkBlur } from '../utils/focusVisible';

import type { ButtonProps, SharedStyleProps } from './types';

import type { SyntheticEvent, ComponentProps, ComponentPropsWithoutRef } from 'react';

class Button extends React.Component<
  ButtonProps & {
    forwardedRef: React.Ref<HTMLElement>;
  } & ComponentPropsWithoutRef<'button'>,
  {
    isFocusVisible: boolean;
  }
> {
  static defaultProps = defaultProps;
  state = { isFocusVisible: false };

  // @ts-ignore
  internalOnClick = (...args) => {
    const { isLoading, onClick } = this.props;
    if (isLoading) {
      args[0].preventDefault();
      return;
    }
    // @ts-expect-error
    onClick && onClick(...args);
  };

  handleFocus = (event: SyntheticEvent) => {
    if (isFocusVisible(event)) {
      this.setState({ isFocusVisible: true });
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleBlur = (event: SyntheticEvent) => {
    if (this.state.isFocusVisible !== false) {
      this.setState({ isFocusVisible: false });
    }
  };

  render() {
    const {
      overrides = {},
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      size,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      kind,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      shape,
      isLoading,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      isSelected,
      // Removing from restProps
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      startEnhancer,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      endEnhancer,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      children,
      forwardedRef,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      colors,
      ...restProps
    } = this.props;
    // Get overrides
    const [BaseButton, baseButtonProps] = getOverrides(
      // adding both (1) BaseButton and (2) Root
      // (1) because it's a Button under the hood
      // (2) because we want consistency with the rest of the components
      overrides.BaseButton || overrides.Root,
      StyledBaseButton
    );
    const [LoadingSpinner, loadingSpinnerProps] = getOverrides<SharedStyleProps>(
      overrides.LoadingSpinner,
      StyledLoadingSpinner
    );
    const [LoadingSpinnerContainer, loadingSpinnerContainerProps] = getOverrides<SharedStyleProps>(
      overrides.LoadingSpinnerContainer,
      StyledLoadingSpinnerContainer
    );
    const sharedProps: SharedStyleProps = {
      ...getSharedProps(this.props),
      $isFocusVisible: this.state.isFocusVisible,
    };
    return (
      // @ts-ignore TS2786 error with web-eats-v2, can remove once React 18 migration complete
      <BaseButton
        ref={forwardedRef}
        data-baseweb="button"
        {...(isLoading
          ? {
              // we want the screenreader to say loading and also the content of child
              // this seems like the best option even tho the child might not be a string
              ['aria-label']: `loading ${
                typeof this.props.children === 'string' ? this.props.children : ''
              }`,
              ['aria-busy']: 'true',
            }
          : {})}
        {...sharedProps}
        {...restProps}
        {...baseButtonProps}
        // Applies last to override passed in onClick
        onClick={this.internalOnClick}
        onFocus={forkFocus({ ...restProps, ...baseButtonProps }, this.handleFocus)}
        onBlur={forkBlur({ ...restProps, ...baseButtonProps }, this.handleBlur)}
      >
        {isLoading ? (
          <React.Fragment>
            {/* This is not meant to be overridable by users */}
            <div style={{ opacity: 0, display: 'flex', height: '0px' }}>
              <ButtonInternals {...this.props} />
            </div>
            {/* @ts-ignore TS2786 error with web-eats-v2, can remove once React 18 migration complete */}
            <LoadingSpinnerContainer {...sharedProps} {...loadingSpinnerContainerProps}>
              {/* @ts-ignore TS2786 error with web-eats-v2, can remove once React 18 migration complete */}
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

interface ButtonComponentType {
  <C extends React.ElementType = 'button'>(
    props: ButtonProps &
      SharedStyleProps &
      Omit<React.ComponentProps<C>, keyof ButtonProps | keyof SharedStyleProps> & {
        $as?: C;
      }
  ): JSX.Element;
  displayName?: string;
}

const ForwardedButton = React.forwardRef<
  HTMLElement,
  Omit<ComponentProps<typeof Button>, 'forwardedRef'>
>((props, ref) => <Button forwardedRef={ref} {...props} />) as ButtonComponentType;
ForwardedButton.displayName = 'Button';
export default ForwardedButton;

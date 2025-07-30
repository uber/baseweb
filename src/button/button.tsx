/*
Copyright (c) Uber Technologies, Inc.




This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import {
  BaseButton as StyledBaseButton,
  AnchorBaseButton as StyledAnchorBaseButton,
  LoadingSpinner as StyledLoadingSpinner,
  LoadingSpinnerContainer as StyledLoadingSpinnerContainer,
} from './styled-components';
import { getSharedProps } from './utils';
import ButtonInternals from './button-internals';
import { defaultProps } from './default-props';
import { getOverrides } from '../helpers/overrides';
import { isFocusVisible, forkFocus, forkBlur } from '../utils/focusVisible';

import type { BaseButtonProps, SharedStyleProps } from './types';

import type { SyntheticEvent, ComponentProps, ComponentPropsWithoutRef } from 'react';

class Button extends React.Component<
  BaseButtonProps & {
    forwardedRef: React.Ref<HTMLElement>;
  } & ComponentPropsWithoutRef<'button'>,
  {
    isFocusVisible: boolean;
    isHovered: boolean;
    isPressed: boolean;
  }
> {
  static defaultProps = defaultProps;
  state = { isFocusVisible: false, isHovered: false, isPressed: false };

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

  handleHovered = (event: React.MouseEvent<HTMLButtonElement>) => {
    this.setState({ isHovered: true });
    // Forward the mouse enter event to user handler if provided
    if (this.props.onMouseEnter) {
      this.props.onMouseEnter(event);
    }
  };

  handleNotHovered = (event: React.MouseEvent<HTMLButtonElement>) => {
    this.setState({ isHovered: false });
    // Forward the mouse leave event to user handler if provided
    if (this.props.onMouseLeave) {
      this.props.onMouseLeave(event);
    }
  };

  handlePressed = (event: React.MouseEvent<HTMLButtonElement>) => {
    this.setState({ isPressed: true });
    // Forward the mouse down event to user handler if provided
    if (this.props.onMouseDown) {
      this.props.onMouseDown(event);
    }
  };

  handleNotPressed = (event: React.MouseEvent<HTMLButtonElement>) => {
    this.setState({ isPressed: false });
    // Forward the mouse up event to user handler if provided
    if (this.props.onMouseUp) {
      this.props.onMouseUp(event);
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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      minHitArea,
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

    // Get overrides.
    const isAnchor = 'href' in restProps && Boolean(restProps?.href);

    const [BaseButton, baseButtonProps] = getOverrides(
      // adding both (1) BaseButton and (2) Root
      // (1) because it's a Button under the hood
      // (2) because we want consistency with the rest of the components
      overrides.BaseButton || overrides.Root,
      isAnchor ? StyledAnchorBaseButton : StyledBaseButton
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
      $isHovered: this.state.isHovered,
      $isPressed: this.state.isPressed,
    };
    const ariaLoadingElements = isLoading
      ? {
          ['aria-label']:
            typeof this.props.children === 'string'
              ? `loading ${this.props.children}`
              : 'content is loading',
          ['aria-busy']: 'true',
          ['aria-live']: 'polite',
        }
      : {};

    const ariaDisabledProps = restProps?.disabled && isAnchor ? { ['aria-disabled']: true } : {};

    return (
      <BaseButton
        ref={forwardedRef}
        data-baseweb="button"
        {...ariaLoadingElements}
        {...ariaDisabledProps}
        {...sharedProps}
        {...restProps}
        {...baseButtonProps}
        // Applies last to override passed in onClick
        onClick={this.internalOnClick}
        onFocus={forkFocus({ ...restProps, ...baseButtonProps }, this.handleFocus)}
        onBlur={forkBlur({ ...restProps, ...baseButtonProps }, this.handleBlur)}
        onMouseEnter={this.handleHovered}
        onMouseLeave={this.handleNotHovered}
        onMouseDown={this.handlePressed}
        onMouseUp={this.handleNotPressed}
      >
        {isLoading ? (
          <React.Fragment>
            {/* This is not meant to be overridable by users */}
            <ButtonInternals
              {...this.props}
              isHovered={this.state.isHovered}
              isPressed={this.state.isPressed}
              isFocused={this.state.isFocusVisible}
            />

            <LoadingSpinnerContainer {...sharedProps} {...loadingSpinnerContainerProps}>
              <LoadingSpinner {...sharedProps} {...loadingSpinnerProps} />
            </LoadingSpinnerContainer>
          </React.Fragment>
        ) : (
          <ButtonInternals
            {...this.props}
            isHovered={this.state.isHovered}
            isPressed={this.state.isPressed}
            isFocused={this.state.isFocusVisible}
          />
        )}
      </BaseButton>
    );
  }
}

export interface ButtonComponentType {
  <C extends React.ElementType = 'button'>(
    props: BaseButtonProps &
      Omit<React.ComponentProps<C>, keyof BaseButtonProps | keyof SharedStyleProps> &
      SharedStyleProps<C | React.ComponentType<any> | keyof JSX.IntrinsicElements>
  ): JSX.Element;
  displayName?: string;
}

const ForwardedButton = React.forwardRef<
  HTMLElement,
  Omit<ComponentProps<typeof Button>, 'forwardedRef'>
>((props, ref) => <Button forwardedRef={ref} {...props} />) as ButtonComponentType;
ForwardedButton.displayName = 'Button';
export default ForwardedButton;

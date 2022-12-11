/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* global document */
import * as React from 'react';
import { getOverrides, mergeOverrides } from '../helpers/overrides';
import DeleteIcon from '../icon/delete';
import {
  Body as StyledBody,
  CloseIconSvg as StyledCloseIcon,
  InnerContainer as StyledInnerContainer,
} from './styled-components';
import { KIND, TYPE } from './constants';
import { LocaleContext } from '../locale';

import type { ToastProps, ToastPropsShape, ToastPrivateState, SharedStylePropsArg } from './types';
import type { IconOverrides } from '../icon';
import { isFocusVisible, forkFocus, forkBlur } from '../utils/focusVisible';

class Toast extends React.Component<ToastProps, ToastPrivateState> {
  static defaultProps: ToastPropsShape = {
    autoFocus: false,
    autoHideDuration: 0,
    closeable: true,
    kind: KIND.info,
    notificationType: TYPE.toast,
    // Do we need a separate handler for
    // when a notification dismisses automatically
    onClose: () => {},
    onBlur: () => {},
    onFocus: () => {},
    onMouseEnter: () => {},
    onMouseLeave: () => {},
    overrides: {},
  };

  autoHideTimeout: ReturnType<typeof setTimeout> | undefined | null;
  animateInTimer: ReturnType<typeof setTimeout> | undefined | null;
  animateOutCompleteTimer: ReturnType<typeof setTimeout> | undefined | null;
  closeRef:
    | {
        current: SVGSVGElement | undefined | null;
      }
    | undefined
    | null;
  previouslyFocusedElement: SVGElement | HTMLElement | undefined | null;

  state = {
    isVisible: false,
    isRendered: true,
    isFocusVisible: false,
  };

  constructor(props: ToastProps) {
    super(props);
    this.closeRef = React.createRef();
    this.previouslyFocusedElement = null;
  }

  componentDidMount() {
    this.animateIn();
    this.startTimeout();
    if (
      __BROWSER__ &&
      this.props.autoFocus &&
      this.closeRef &&
      this.closeRef.current &&
      this.closeRef.current.focus &&
      typeof this.closeRef.current.focus === 'function'
    ) {
      // todo(flow->ts): double check if typecast is correct
      this.previouslyFocusedElement = document.activeElement as HTMLElement | SVGElement;
      this.closeRef.current.focus();
      this.setState({ isFocusVisible: true });
    }
  }

  componentDidUpdate(prevProps: ToastProps) {
    if (
      this.props.autoHideDuration !== prevProps.autoHideDuration ||
      this.props.__updated !== prevProps.__updated
    ) {
      this.startTimeout();
    }
  }

  componentWillUnmount() {
    this.clearTimeout();
  }

  handleFocus = (event: React.FocusEvent) => {
    if (isFocusVisible(event)) {
      this.setState({ isFocusVisible: true });
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleBlur = (event: React.FocusEvent) => {
    if (this.state.isFocusVisible !== false) {
      this.setState({ isFocusVisible: false });
    }
  };

  startTimeout() {
    if (this.props.autoHideDuration) {
      if (this.autoHideTimeout) {
        clearTimeout(this.autoHideTimeout);
      }
      this.autoHideTimeout = setTimeout(this.dismiss, this.props.autoHideDuration);
    }
  }

  clearTimeout() {
    [this.autoHideTimeout, this.animateInTimer, this.animateOutCompleteTimer].forEach((timerId) => {
      if (timerId) {
        clearTimeout(timerId);
      }
    });
  }

  animateIn = () => {
    // Defer to next event loop
    this.animateInTimer = setTimeout(() => {
      this.setState({ isVisible: true });
    }, 0);
  };

  animateOut = (callback: () => unknown = () => {}) => {
    this.setState({ isVisible: false });
    // Remove the toast from the DOM after animation finishes
    this.animateOutCompleteTimer = setTimeout(() => {
      this.setState({ isRendered: false });
      callback();
    }, 600);
  };

  dismiss = () => {
    this.animateOut(this.props.onClose);
    if (this.props.autoFocus && this.previouslyFocusedElement) {
      this.previouslyFocusedElement.focus();
    }
  };

  onFocus = (e: React.FocusEvent) => {
    if (!this.state.isVisible) return;
    // @ts-ignore
    clearTimeout(this.autoHideTimeout);
    // @ts-ignore
    clearTimeout(this.animateOutCompleteTimer);
    typeof this.props.onFocus === 'function' && this.props.onFocus(e);
  };

  onMouseEnter = (e: React.MouseEvent) => {
    if (!this.state.isVisible) return;
    // @ts-ignore
    clearTimeout(this.autoHideTimeout);
    // @ts-ignore
    clearTimeout(this.animateOutCompleteTimer);
    typeof this.props.onMouseEnter === 'function' && this.props.onMouseEnter(e);
  };

  onBlur = (e: React.FocusEvent) => {
    this.startTimeout();
    typeof this.props.onBlur === 'function' && this.props.onBlur(e);
  };

  onMouseLeave = (e: React.MouseEvent) => {
    this.startTimeout();
    typeof this.props.onMouseLeave === 'function' && this.props.onMouseLeave(e);
  };

  getSharedProps(): Partial<SharedStylePropsArg> {
    const { kind, notificationType, closeable } = this.props;
    const { isRendered, isVisible } = this.state;
    return {
      $kind: kind,
      $type: notificationType,
      $closeable: closeable,
      $isRendered: isRendered,
      $isVisible: isVisible,
    };
  }

  render() {
    const { children, closeable } = this.props;
    const { isRendered } = this.state;
    const {
      // @ts-ignore
      Body: BodyOverride,
      // @ts-ignore
      CloseIcon: CloseIconOverride,
      // @ts-ignore
      InnerContainer: InnerContainerOverride,
    } = this.props.overrides;

    const [Body, bodyProps] = getOverrides(BodyOverride, StyledBody);

    const [InnerContainer, innerContainerProps] = getOverrides(
      InnerContainerOverride,
      StyledInnerContainer
    );

    const [CloseIcon, closeIconProps] = getOverrides(CloseIconOverride, StyledCloseIcon);

    const closeIconOverrides: IconOverrides = mergeOverrides(
      { Svg: { component: CloseIcon } },
      { Svg: CloseIconOverride }
    );

    const sharedProps = this.getSharedProps();

    if (!isRendered) {
      return null;
    }
    return (
      <LocaleContext.Consumer>
        {(locale) => (
          <Body
            role="alert"
            data-baseweb={this.props['data-baseweb'] || 'toast'}
            {...sharedProps}
            {...bodyProps}
            // the properties below have to go after overrides
            onBlur={this.onBlur}
            onFocus={this.onFocus}
            onMouseEnter={this.onMouseEnter}
            onMouseLeave={this.onMouseLeave}
          >
            <InnerContainer {...sharedProps} {...innerContainerProps}>
              {typeof children === 'function' ? children({ dismiss: this.dismiss }) : children}
            </InnerContainer>
            {closeable ? (
              <DeleteIcon
                // @ts-ignore
                ref={this.closeRef}
                role="button"
                tabIndex={0}
                $isFocusVisible={this.state.isFocusVisible}
                onClick={this.dismiss}
                onKeyPress={(event) => {
                  if (event.key === 'Enter') {
                    this.dismiss();
                  }
                }}
                title={locale.toast.close}
                {...sharedProps}
                {...closeIconProps}
                onFocus={forkFocus(closeIconProps, this.handleFocus)}
                onBlur={forkBlur(closeIconProps, this.handleBlur)}
                overrides={closeIconOverrides}
              />
            ) : null}
          </Body>
        )}
      </LocaleContext.Consumer>
    );
  }
}

export default Toast;

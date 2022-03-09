/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
/* global document */
import * as React from 'react';
import {getOverrides, mergeOverrides} from '../helpers/overrides.js';
import DeleteIcon from '../icon/delete.js';
import {
  Body as StyledBody,
  CloseIconSvg as StyledCloseIcon,
  InnerContainer as StyledInnerContainer,
} from './styled-components.js';
import {KIND, TYPE} from './constants.js';
import {LocaleContext} from '../locale/index.js';

import type {
  ToastPropsT,
  ToastPropsShapeT,
  ToastPrivateStateT,
  SharedStylePropsArgT,
} from './types.js';
import type {OverridesT} from '../icon/index.js';
import {isFocusVisible, forkFocus, forkBlur} from '../utils/focusVisible.js';

class Toast extends React.Component<ToastPropsT, ToastPrivateStateT> {
  static defaultProps: ToastPropsShapeT = {
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

  autoHideTimeout: ?TimeoutID;
  animateInTimer: ?TimeoutID;
  animateOutCompleteTimer: ?TimeoutID;
  closeRef: ?{current: ?mixed};
  previouslyFocusedElement: ?HTMLElement;

  state = {
    isVisible: false,
    isRendered: true,
    isFocusVisible: false,
  };

  constructor(props: ToastPropsT) {
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
      this.previouslyFocusedElement = document.activeElement;
      // $FlowFixMe: CloseIcon is `mixed` type so doesn't like `focus` call.
      this.closeRef.current.focus();
      this.setState({isFocusVisible: true});
    }
  }

  componentDidUpdate(prevProps: ToastPropsT) {
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

  handleFocus = (event: SyntheticEvent<>) => {
    if (isFocusVisible(event)) {
      this.setState({isFocusVisible: true});
    }
  };

  handleBlur = (event: SyntheticEvent<>) => {
    if (this.state.isFocusVisible !== false) {
      this.setState({isFocusVisible: false});
    }
  };

  startTimeout() {
    if (this.props.autoHideDuration) {
      if (this.autoHideTimeout) {
        clearTimeout(this.autoHideTimeout);
      }
      this.autoHideTimeout = setTimeout(
        this.dismiss,
        this.props.autoHideDuration,
      );
    }
  }

  clearTimeout() {
    [
      this.autoHideTimeout,
      this.animateInTimer,
      this.animateOutCompleteTimer,
    ].forEach((timerId) => {
      if (timerId) {
        clearTimeout(timerId);
      }
    });
  }

  animateIn = () => {
    // Defer to next event loop
    this.animateInTimer = setTimeout(() => {
      this.setState({isVisible: true});
    }, 0);
  };

  animateOut = (callback: () => mixed = () => {}) => {
    this.setState({isVisible: false});
    // Remove the toast from the DOM after animation finishes
    this.animateOutCompleteTimer = setTimeout(() => {
      this.setState({isRendered: false});
      callback();
    }, 600);
  };

  dismiss = () => {
    this.animateOut(this.props.onClose);
    if (this.props.autoFocus && this.previouslyFocusedElement) {
      this.previouslyFocusedElement.focus();
    }
  };

  onFocus = (e: Event) => {
    if (!this.state.isVisible) return;
    clearTimeout(this.autoHideTimeout);
    clearTimeout(this.animateOutCompleteTimer);
    typeof this.props.onFocus === 'function' && this.props.onFocus(e);
  };

  onMouseEnter = (e: Event) => {
    if (!this.state.isVisible) return;
    clearTimeout(this.autoHideTimeout);
    clearTimeout(this.animateOutCompleteTimer);
    typeof this.props.onMouseEnter === 'function' && this.props.onMouseEnter(e);
  };

  onBlur = (e: Event) => {
    this.startTimeout();
    typeof this.props.onBlur === 'function' && this.props.onBlur(e);
  };

  onMouseLeave = (e: Event) => {
    this.startTimeout();
    typeof this.props.onMouseLeave === 'function' && this.props.onMouseLeave(e);
  };

  getSharedProps(): $Shape<SharedStylePropsArgT> {
    const {kind, notificationType, closeable} = this.props;
    const {isRendered, isVisible} = this.state;
    return {
      $kind: kind,
      $type: notificationType,
      $closeable: closeable,
      $isRendered: isRendered,
      $isVisible: isVisible,
    };
  }

  render() {
    const {children, closeable} = this.props;
    const {isRendered} = this.state;
    const {
      Body: BodyOverride,
      CloseIcon: CloseIconOverride,
      InnerContainer: InnerContainerOverride,
    } = this.props.overrides;

    const [Body, bodyProps] = getOverrides(BodyOverride, StyledBody);

    const [InnerContainer, innerContainerProps] = getOverrides(
      InnerContainerOverride,
      StyledInnerContainer,
    );

    const [CloseIcon, closeIconProps] = getOverrides(
      CloseIconOverride,
      StyledCloseIcon,
    );

    const closeIconOverrides: OverridesT = mergeOverrides(
      {Svg: {component: CloseIcon}},
      // $FlowFixMe
      {Svg: CloseIconOverride},
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
              {typeof children === 'function'
                ? children({dismiss: this.dismiss})
                : children}
            </InnerContainer>
            {closeable ? (
              <DeleteIcon
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

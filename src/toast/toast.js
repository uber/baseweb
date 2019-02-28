/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {getOverrides, mergeOverrides} from '../helpers/overrides.js';
import {Delete as DeleteAltIcon} from '../icon/index.js';
import {
  Body as StyledBody,
  CloseIconSvg as StyledCloseIcon,
} from './styled-components.js';
import {KIND, TYPE} from './constants.js';
import {LocaleContext} from '../locale/index.js';

import type {
  ToastPropsT,
  ToastPrivateStateT,
  SharedStylePropsArgT,
} from './types.js';
import type {OverridesT} from '../icon/index.js';

class Toast extends React.Component<ToastPropsT, ToastPrivateStateT> {
  static defaultProps: $Shape<ToastPropsT> = {
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

  state = {
    isVisible: false,
    isRendered: true,
  };

  componentDidMount() {
    this.animateIn();
    this.startTimeout();
  }

  componentWillUnmount() {
    this.clearTimeout();
  }

  startTimeout() {
    if (this.props.autoHideDuration) {
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
    ].forEach(timerId => {
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

  animateOut = (callback: () => void = () => {}) => {
    this.setState({isVisible: false});
    // Remove the toast from the DOM after animation finishes
    this.animateOutCompleteTimer = setTimeout(() => {
      this.setState({isRendered: false});
      callback();
    }, 600);
  };

  dismiss = () => {
    this.animateOut(this.props.onClose);
  };

  onFocus = (e: Event) => {
    this.clearTimeout();
    typeof this.props.onFocus === 'function' && this.props.onFocus(e);
  };

  onMouseEnter = (e: Event) => {
    this.clearTimeout();
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
    } = this.props.overrides;

    const [Body, bodyProps] = getOverrides(BodyOverride, StyledBody);

    const [CloseIcon, closeIconProps] = getOverrides(
      CloseIconOverride,
      StyledCloseIcon,
    );

    const closeIconOverrides: OverridesT = mergeOverrides(
      {Svg: CloseIcon},
      // $FlowFixMe
      {Svg: CloseIconOverride},
    );

    const sharedProps = this.getSharedProps();

    if (!isRendered) {
      return null;
    }
    return (
      <LocaleContext.Consumer>
        {locale => (
          <Body
            tabIndex={0}
            role="alert"
            {...sharedProps}
            {...bodyProps}
            // the properties below have to go after overrides
            onBlur={this.onBlur}
            onFocus={this.onFocus}
            onMouseEnter={this.onMouseEnter}
            onMouseLeave={this.onMouseLeave}
          >
            {closeable ? (
              <DeleteAltIcon
                onClick={this.dismiss}
                title={locale.toast.close}
                {...sharedProps}
                {...closeIconProps}
                overrides={closeIconOverrides}
              />
            ) : null}
            {typeof children === 'function'
              ? children({dismiss: this.dismiss})
              : children}
          </Body>
        )}
      </LocaleContext.Consumer>
    );
  }
}

export default Toast;

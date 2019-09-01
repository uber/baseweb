/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-disable cup/no-undef */
import * as React from 'react';
import ReactDOM from 'react-dom';
import { getOverrides, mergeOverrides } from '../helpers/overrides';
import { KIND, PLACEMENT } from './constants';
import {
  Root as StyledRoot,
  Body as StyledBody,
  CloseIconSvg as StyledCloseIcon,
  InnerContainer as StyledInnerContainer,
} from './styled-components';
import Toast from './toast';
import type { ToasterPropsT, ToastPropsShapeT, ToasterContainerStateT, ToastPropsT } from './types';

let toasterRef: ToasterContainer | undefined;

export class ToasterContainer extends React.Component<
  Partial<ToasterPropsT>,
  ToasterContainerStateT
> {
  static defaultProps: ToasterPropsT = {
    autoFocus: false,
    autoHideDuration: 0,
    children: null,
    closeable: true,
    overrides: {},
    placement: PLACEMENT.top,
    resetAutoHideTimerOnUpdate: true,
    usePortal: true,
  };

  constructor(props: ToasterPropsT) {
    super(props);

    toasterRef = this;
  }

  state = {
    isMounted: false,
    toasts: [],
  };

  dismissHandlers = {};

  toastId: number = 0;

  componentDidMount() {
    this.setState({ isMounted: true });
  }

  getToastProps = (
    props: ToastPropsT
  ): ToastPropsT & {
    key: React.Key;
  } => {
    const { autoFocus, autoHideDuration, closeable } = this.props;
    const key: React.Key = props.key || `toast-${this.toastId++}`;
    return { autoFocus, autoHideDuration, closeable, ...props, key };
  };

  // @ts-expect-error todo: default value does not look correct and also probably do is never used
  show = (props: ToastPropsT = {}): React.Key => {
    if (this.state.toasts.map((t) => t.key).includes(props.key)) {
      this.update(props.key, props);
      return props.key;
    }
    const toastProps = this.getToastProps(props);
    this.setState(({ toasts }) => {
      return { toasts: [...toasts, toastProps] };
    });
    return toastProps.key;
  };

  update = (key: React.Key, props: ToastPropsT): void => {
    this.setState(({ toasts }) => {
      const updatedToasts = toasts.map((toast) => {
        if (toast.key === key) {
          const updatedToastProps = {
            ...toast,
            ...this.getToastProps({
              autoHideDuration: toast.autoHideDuration,
              ...props,
            }),
            key,
            ...(this.props.resetAutoHideTimerOnUpdate
              ? { __updated: (+toast.__updated || 0) + 1 }
              : {}),
          };
          return updatedToastProps;
        }
        return toast;
      });
      return {
        toasts: updatedToasts,
      };
    });
  };

  dismiss = (key: React.Key) => {
    if (this.dismissHandlers[key]) {
      this.dismissHandlers[key]();
    }
  };

  clearAll = () => {
    Object.keys(this.dismissHandlers).forEach((key) => {
      this.dismissHandlers[key]();
    });
  };

  clear = (key?: React.Key) => {
    key === undefined ? this.clearAll() : this.dismiss(key);
  };

  internalOnClose = (key: React.Key) => {
    delete this.dismissHandlers[key];
    this.setState(({ toasts }) => ({
      toasts: toasts.filter((t) => {
        return !(t.key === key);
      }),
    }));
  };

  getOnCloseHandler = (key: React.Key, onClose?: (() => unknown) | null) => {
    return () => {
      this.internalOnClose(key);
      typeof onClose === 'function' && onClose();
    };
  };

  renderToast = (
    toastProps: ToastPropsT & {
      key: React.Key;
    }
  ): React.ReactNode => {
    const { onClose, children, key, ...restProps } = toastProps;

    const {
      ToastBody: BodyOverride,
      ToastCloseIcon: CloseIconOverride,
      ToastInnerContainer: InnerContainerOverride,
    } = this.props.overrides;
    const globalToastOverrides = mergeOverrides(
      {
        Body: StyledBody,
        CloseIcon: StyledCloseIcon,
        InnerContainer: StyledInnerContainer,
      },
      {
        Body: BodyOverride || {},
        CloseIcon: CloseIconOverride || {},
        InnerContainer: InnerContainerOverride || {},
      }
    );
    const toastOverrides = mergeOverrides(globalToastOverrides, toastProps.overrides);

    return (
      <Toast
        {...restProps}
        overrides={toastOverrides}
        key={key}
        onClose={this.getOnCloseHandler(key, onClose)}
      >
        {({ dismiss }) => {
          this.dismissHandlers[key] = dismiss;
          // $FlowFixMe
          return children;
        }}
      </Toast>
    );
  };

  getSharedProps = () => {
    const { placement } = this.props;
    return {
      $placement: placement,
    };
  };

  render() {
    const sharedProps = this.getSharedProps();

    const { Root: RootOverride } = this.props.overrides;
    const [Root, rootProps] = getOverrides(RootOverride, StyledRoot);

    const toastsLength = this.state.toasts.length;
    const toastsToRender = [];
    // render the toasts from the newest at the start
    // to the oldest at the end
    // eslint-disable-next-line for-direction
    for (let i = toastsLength - 1; i >= 0; i--) {
      toastsToRender.push(this.renderToast(this.state.toasts[i]));
    }

    const root = (
      <Root data-baseweb="toaster" {...sharedProps} {...rootProps}>
        {toastsToRender}
      </Root>
    );

    //Only render the portal in the browser, otherwise render the toasts and children
    if (this.state.isMounted) {
      return (
        <>
          {this.props.usePortal && __BROWSER__ && document.body
            ? ReactDOM.createPortal(root, document.body)
            : root}
          {this.props.children}
        </>
      );
    } else {
      return <>{this.props.children}</>;
    }
  }
}

const toaster = {
  getRef: function (): ToasterContainer | undefined {
    return toasterRef;
  },
  show: function (
    children: React.ReactNode,
    props: ToastPropsShapeT = {}
  ): React.Key | undefined | null {
    // toasts can not be added until Toaster is mounted
    // no SSR for the `toaster.show()`
    const toasterInstance = this.getRef();
    if (toasterInstance) {
      return toasterInstance.show({ ...props, children });
    } else if (__DEV__) {
      throw new Error(
        'Please make sure to add the ToasterContainer to your application, and it is mounted, before adding toasts! You can find more information here: https://baseweb.design/components/toast'
      );
    }
  },
  info: function (children: React.ReactNode, props: ToastPropsShapeT = {}): React.Key {
    return this.show(children, { ...props, kind: KIND.info });
  },
  positive: function (children: React.ReactNode, props: ToastPropsShapeT = {}): React.Key {
    return this.show(children, { ...props, kind: KIND.positive });
  },
  warning: function (children: React.ReactNode, props: ToastPropsShapeT = {}): React.Key {
    return this.show(children, { ...props, kind: KIND.warning });
  },
  negative: function (children: React.ReactNode, props: ToastPropsShapeT = {}): React.Key {
    return this.show(children, { ...props, kind: KIND.negative });
  },
  update: function (key: React.Key, props: Partial<ToastPropsT>): void {
    const toasterInstance = this.getRef();
    if (toasterInstance) {
      toasterInstance.update(key, props);
    } else if (__DEV__) {
      // eslint-disable-next-line no-console
      console.error('No ToasterContainer is mounted yet.');
    }
  },
  clear: function (key?: React.Key | undefined | null): void {
    const toasterInstance = this.getRef();
    if (toasterInstance) {
      toasterInstance.clear(key);
    } else if (__DEV__) {
      // eslint-disable-next-line no-console
      console.error('No ToasterContainer is mounted yet.');
    }
  },
};

export default toaster;

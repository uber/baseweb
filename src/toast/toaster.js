// @flow
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {PLACEMENT} from './constants';
import {Root} from './styled-components';
import Toast from './toast';
import type {
  ToasterPropsT,
  ToasterStateT,
  ToastPropsT,
  ToastPropsAltT,
} from './types';

let toasterRef: React.Ref<typeof Toaster> = React.createRef();

class ToasterComponent extends React.Component<ToasterPropsT, ToasterStateT> {
  static defaultProps = {
    placement: PLACEMENT.top,
  };

  state = {
    toasts: [],
  };

  dismissHandlers = {};

  toastId: number = 0;

  onClose = (key: React.Key) => {
    delete this.dismissHandlers[key];
    this.setState(({toasts}) => ({
      toasts: toasts.filter(t => {
        return !(t.key === key);
      }),
    }));
  };

  getOnCloseHandler = (key: React.Key, onClose: () => void) => {
    return () => {
      this.onClose(key);
      typeof onClose === 'function' && onClose();
    };
  };

  getToastProps = (props: string | ToastPropsT): ToastPropsAltT => {
    const key: React.Key = props.key || `toast-${this.toastId++}`;
    if (typeof props === 'string') {
      return {children: props, key};
    }
    return {...props, key};
  };

  renderToast = (toastProps: ToastPropsT): React.Node => {
    const {onClose, children, key, ...rest} = toastProps;
    return (
      <Toast {...rest} key={key} onClose={this.getOnCloseHandler(key, onClose)}>
        {({dismiss}) => {
          this.dismissHandlers[key] = dismiss;
          return children;
        }}
      </Toast>
    );
  };

  show = (props: string | ToastPropsT): React.Key => {
    const toastProps = this.getToastProps(props);
    this.setState(({toasts}) => {
      // const newList = [...toasts];
      toasts.unshift(toastProps);
      return {toasts};
    });
    return toastProps.key;
  };

  update = (key: React.Key, props: string | ToastPropsT): void => {
    this.setState(({toasts}) => {
      toasts.forEach((t, index, arr) => {
        if (t.key === key) {
          arr[index] = {...t, ...this.getToastProps(props), key};
        }
      });
      return {
        toasts,
      };
    });
  };

  dismiss = (key: React.Key) => {
    if (this.dismissHandlers[key]) {
      this.dismissHandlers[key]();
    }
  };

  clearAll = () => {
    Object.keys(this.dismissHandlers).forEach(key => {
      this.dismissHandlers[key]();
    });
  };

  clear = (key?: React.Key) => {
    key === undefined ? this.clearAll() : this.dismiss(key);
  };

  getSharedProps = () => {
    const {placement} = this.props;
    return {
      $placement: placement,
    };
  };

  render = () => {
    const sharedProps = this.getSharedProps();
    // Only render on the browser (portals aren't supported server-side)
    if (__BROWSER__) {
      return ReactDOM.createPortal(
        <Root {...sharedProps}>
          {this.props.children}
          {this.state.toasts.map(this.renderToast)}
        </Root>,
        // $FlowFixMe
        document.body,
      );
    }
    return null;
  };
}

export const Toaster = ToasterComponent;

export default {
  create: function create(props?: ToasterPropsT): React.Node {
    return <ToasterComponent {...props} ref={toasterRef} />;
  },
  show: (props: string | ToastPropsAltT): ?React.Key => {
    if (toasterRef.current) {
      return toasterRef.current.show(props);
    } else if (__DEV__) {
      // eslint-disable-next-line no-console
      console.error('No toaster created yet');
    }
    return null;
  },
  update: (key: React.Key, props: string | ToastPropsAltT): void => {
    if (toasterRef.current) {
      toasterRef.current.update(key, props);
    } else if (__DEV__) {
      // eslint-disable-next-line no-console
      console.error('No toaster created yet');
    }
  },
  clear: (key?: React.Key): void => {
    if (toasterRef.current) {
      toasterRef.current.clear(key);
    } else if (__DEV__) {
      // eslint-disable-next-line no-console
      console.error('No toaster created yet');
    }
  },
};

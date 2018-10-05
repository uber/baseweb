/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {styled} from '../styles';
import {Toast, KIND} from './index';
import {Button, KIND as ButtonKind, SIZE} from '../button';

import examples from './examples-list';

export const suite = 'Toast Test Suite';

const Centered = styled('div', {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  lineHeight: 1.5,
});
const Space = styled('span', {
  display: 'inline-block',
  lineHeight: 1.5,
  marginTop: '10px',
  marginRight: '10px',
  marginLeft: '10px',
});

const getBtnStyle = color => ({$theme}) => {
  const hoverStyle = {backgroundColor: $theme.colors[`${color}500`]};
  const activeStyle = {backgroundColor: $theme.colors[`${color}600`]};
  return {
    backgroundColor: $theme.colors[color],
    ':hover:enabled': hoverStyle,
    ':focus:enabled': hoverStyle,
    ':active:enabled': activeStyle,
  };
};

class NotificationExample extends React.Component<{}, {toasts: []}> {
  state = {
    toasts: [],
  };
  toastId = 0;

  getToastProps(props) {
    const toastId = this.toastId++;
    return {
      key: toastId,
      autoHideDuration: 4000,
      onClose: this.getOnCloseHandler(toastId),
      children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      ...props,
    };
  }

  add = props => () => {
    const toastProps = this.getToastProps(props);
    this.setState(state => {
      const toasts = [...state.toasts];
      toasts.unshift(toastProps);
      return {toasts};
    });
  };

  addInfo = this.add({});
  addPositive = this.add({kind: KIND.positive});
  addWarning = this.add({kind: KIND.warning});
  addNegative = this.add({kind: KIND.negative});

  dismiss = (key: number) => {
    this.setState(({toasts}) => ({
      // $FlowFixMe
      toasts: toasts.filter(t => {
        return !(t.key === key);
      }),
    }));
  };

  getOnCloseHandler(key) {
    return () => {
      this.dismiss(key);
    };
  }

  render() {
    return (
      <div>
        <Button onClick={this.addInfo}>Info toast</Button>
        <Space />
        <Button
          onClick={this.addPositive}
          overrides={{
            BaseButton: {
              style: getBtnStyle('positive'),
            },
          }}
        >
          Success toast
        </Button>
        <Space />
        <Button
          onClick={this.addWarning}
          overrides={{
            BaseButton: {
              style: getBtnStyle('warning'),
            },
          }}
        >
          Warning toast
        </Button>
        <Space />
        <Button
          onClick={this.addNegative}
          overrides={{
            BaseButton: {
              style: getBtnStyle('negative'),
            },
          }}
        >
          Negative toast
        </Button>
        <Centered>
          {this.state.toasts.map((toastOptions, index) => {
            return <Toast key={index} {...toastOptions} />;
          })}
        </Centered>
      </div>
    );
  }
}

export default {
  [examples.SIMPLE_EXAMPLE]: function Story1() {
    return (
      <Centered>
        <Toast>Default info notification</Toast>
        <Toast closeable={false}>
          {({dismiss}) => {
            return (
              <React.Fragment>
                Info notification with no close button and children as a
                function.
                <Centered>
                  <Space>
                    <Button
                      onClick={dismiss}
                      kind={ButtonKind.secondary}
                      size={SIZE.compact}
                    >
                      Click to dismiss
                    </Button>
                  </Space>
                </Centered>
              </React.Fragment>
            );
          }}
        </Toast>
        <Toast kind={KIND.positive}>Positive notification</Toast>
        <Toast kind={KIND.warning}>Warning notification</Toast>
        <Toast kind={KIND.negative}>Negative notification</Toast>
      </Centered>
    );
  },
  [examples.DISMISSABLE_EXAMPLE]: function Story1() {
    return (
      <Centered>
        <NotificationExample />
      </Centered>
    );
  },
  [examples.OVERRIDES_EXAMPLE]: function Story1() {
    return (
      <Centered>
        <Toast
          overrides={{
            Body: {
              style: {
                backgroundImage:
                  'linear-gradient(#400080, transparent), linear-gradient(200deg, #d047d1, #ff0000, #ffff00)',
              },
            },
            CloseIcon: {
              props: {
                title: 'Close',
              },
              style: {
                backgroundColor: '#fff',
                color: '#000',
                borderRadius: '50%',
              },
            },
          }}
        >
          Toast with overrides
        </Toast>
      </Centered>
    );
  },
};

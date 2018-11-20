/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {styled} from '../styles';
import {Toast, toaster, ToasterContainer, KIND, PLACEMENT} from './index';
import {Button, KIND as ButtonKind, SIZE} from '../button';
import type {KindTypeT} from './types';

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

class ToasterExample extends React.Component<{}, {toasts: []}> {
  getToastProps(props) {
    return {
      onClose: () => {
        // eslint-disable-next-line no-console
        console.log('Toast dismissed');
      },
      autoHideDuration: 5000,
      children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      ...props,
    };
  }

  add = (kind: KindTypeT, props) => () => {
    const {
      children,
      ...toastProps
    }: {children: React.Node} = this.getToastProps(props);
    toaster[kind](children, toastProps);
  };

  addInfo = this.add(KIND.info);
  addPositive = this.add(KIND.positive);
  addWarning = this.add(KIND.warning);
  addNegative = this.add(KIND.negative);

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
      </div>
    );
  }
}

class ToasterAdvancedExample extends React.Component<{}, {cleared: boolean}> {
  keyToUpdate: React.Key;
  state = {cleared: false};

  componentDidMount() {
    this.addNotifications();
  }

  addNotifications() {
    toaster.info('Info notification', {closeable: false});
    toaster.positive(<span>Positive notification</span>);
    this.keyToUpdate = toaster.warning('Warning notification');
  }

  render() {
    return (
      <div>
        <Space>
          <Button
            onClick={() => {
              const kind = {
                '0': KIND.info,
                '1': KIND.positive,
                '2': KIND.warning,
              }[Math.floor(Math.random() * Math.floor(3))];
              toaster.update(this.keyToUpdate, {
                kind,
                children: `Updated ${kind} notification`,
              });
            }}
          >
            Update to random
          </Button>
        </Space>
        <Space>
          <Button
            onClick={() => {
              toaster.clear();
              this.setState({cleared: true});
            }}
          >
            Clear all
          </Button>
        </Space>
        <Space>
          <Button
            disabled={!this.state.cleared}
            onClick={() => {
              this.addNotifications();
              this.setState({cleared: false});
            }}
          >
            Add toasts
          </Button>
        </Space>
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
                <div>
                  <Space>
                    <Button
                      onClick={dismiss}
                      kind={ButtonKind.secondary}
                      size={SIZE.compact}
                    >
                      Click to dismiss
                    </Button>
                  </Space>
                </div>
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
  [examples.TOASTER_EXAMPLE]: function Story2() {
    return (
      <Centered>
        <ToasterContainer placement={PLACEMENT.bottomRight} />
        <ToasterExample />
      </Centered>
    );
  },
  [examples.TOASTER_ADVANCED_EXAMPLE]: function Story2() {
    return (
      <Centered>
        <ToasterContainer placement={PLACEMENT.bottom} />
        <ToasterAdvancedExample />
      </Centered>
    );
  },
  [examples.OVERRIDES_EXAMPLE]: function Story3() {
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
                title: 'Dismiss',
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

/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { getOverrides } from '../helpers/overrides';
import type { InputPropsT, InternalStateT, AdjoinedT } from './types';
import { getSharedProps } from './utils';
import BaseInput from './base-input';
import { Root as StyledRoot, InputEnhancer as StyledInputEnhancer } from './styled-components';
import { SIZE, ADJOINED, ENHANCER_POSITION } from './constants';

import type { FocusEvent } from 'react';

class Input extends React.Component<InputPropsT, InternalStateT> {
  static defaultProps = {
    autoComplete: 'on',
    autoFocus: false,
    disabled: false,
    name: '',
    onBlur: () => {},
    onFocus: () => {},
    overrides: {},
    required: false,
    size: SIZE.default,
    startEnhancer: null,
    endEnhancer: null,
    clearable: false,
    type: 'text',
    readOnly: false,
  };

  /**
   * This "Stateless" input still has state. This is private state that
   * customers shouldn't have to manage themselves, such as input's focus state.
   */
  state = {
    isFocused: (this.props.autoFocus && !this.props.readOnly) || false,
  };

  onFocus = (e: FocusEvent<HTMLInputElement>) => {
    if (!this.props.readOnly) {
      this.setState({ isFocused: true });
      this.props.onFocus(e);
    }
  };

  onBlur = (e: FocusEvent<HTMLInputElement>) => {
    if (!this.props.readOnly) {
      this.setState({ isFocused: false });
      this.props.onBlur(e);
    }
  };

  render() {
    const {
      startEnhancer,
      endEnhancer,
      overrides: {
        Root: RootOverride,
        StartEnhancer: StartEnhancerOverride,
        EndEnhancer: EndEnhancerOverride,
        ...restOverrides
      },
      ...restProps
    } = this.props;

    const [Root, rootProps] = getOverrides(RootOverride, StyledRoot);
    const [StartEnhancer, startEnhancerProps] = getOverrides(
      StartEnhancerOverride,
      StyledInputEnhancer
    );
    const [EndEnhancer, endEnhancerProps] = getOverrides(EndEnhancerOverride, StyledInputEnhancer);

    const sharedProps = getSharedProps(this.props, this.state);

    if (__DEV__) {
      if (this.props.error && this.props.positive) {
        // eslint-disable-next-line no-console
        console.warn(
          `[Input] \`error\` and \`positive\` are both set to \`true\`. \`error\` will take precedence but this may not be what you want.`
        );
      }
    }

    return (
      <Root
        data-baseweb="input"
        {...sharedProps}
        {...rootProps}
        $adjoined={getAdjoinedProp(startEnhancer, endEnhancer)}
        $hasIconTrailing={this.props.clearable || this.props.type == 'password'}
      >
        {isEnhancer(startEnhancer) && (
          <StartEnhancer
            {...sharedProps}
            {...startEnhancerProps}
            $position={ENHANCER_POSITION.start}
          >
            {typeof startEnhancer === 'function' ? startEnhancer(sharedProps) : startEnhancer}
          </StartEnhancer>
        )}
        <BaseInput
          {...restProps}
          overrides={restOverrides}
          adjoined={getAdjoinedProp(startEnhancer, endEnhancer)}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
        />
        {isEnhancer(endEnhancer) && (
          <EndEnhancer {...sharedProps} {...endEnhancerProps} $position={ENHANCER_POSITION.end}>
            {typeof endEnhancer === 'function' ? endEnhancer(sharedProps) : endEnhancer}
          </EndEnhancer>
        )}
      </Root>
    );
  }
}

function getAdjoinedProp(startEnhancer, endEnhancer): AdjoinedT {
  if (isEnhancer(startEnhancer) && isEnhancer(endEnhancer)) {
    return ADJOINED.both;
  } else if (isEnhancer(startEnhancer)) {
    return ADJOINED.left;
  } else if (isEnhancer(endEnhancer)) {
    return ADJOINED.right;
  }
  return ADJOINED.none;
}

function isEnhancer(enhancer): boolean {
  return Boolean(enhancer || enhancer === 0);
}

export default Input;

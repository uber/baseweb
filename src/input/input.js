/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {getOverrides} from '../helpers/overrides';
import type {InputPropsT, InternalStateT, AdjoinedT} from './types';
import {getSharedProps} from './utils';
import BaseInput from './base-input';
import {
  Root as StyledRoot,
  InputEnhancer as StyledInputEnhancer,
} from './styled-components';
import {ADJOINED, ENHANCER_POSITION} from './constants';

class Input extends React.Component<InputPropsT, InternalStateT> {
  static defaultProps = {
    autoFocus: false,
    disabled: false,
    name: '',
    error: false,
    onBlur: () => {},
    onFocus: () => {},
    overrides: {},
    required: false,
    size: 'default',
    startEnhancer: null,
    endEnhancer: null,
  };

  /**
   * This "Stateless" input still has state. This is private state that
   * customers shouldn't have to manage themselves, such as input's focus state.
   */
  state = {
    isFocused: this.props.autoFocus || false,
  };

  onFocus = (e: SyntheticEvent<HTMLElement>) => {
    this.setState({isFocused: true});
    this.props.onFocus(e);
  };

  onBlur = (e: SyntheticEvent<HTMLElement>) => {
    this.setState({isFocused: false});
    this.props.onBlur(e);
  };

  render() {
    const {startEnhancer, endEnhancer, ...rest} = this.props;

    const {
      Root: RootOverride,
      StartEnhancer: StartEnhancerOverride,
      EndEnhancer: EndEnhancerOverride,
    } = this.props.overrides;

    const [Root, rootProps] = getOverrides(RootOverride, StyledRoot);
    const [StartEnhancer, startEnhancerProps] = getOverrides(
      StartEnhancerOverride,
      StyledInputEnhancer,
    );
    const [EndEnhancer, endEnhancerProps] = getOverrides(
      EndEnhancerOverride,
      StyledInputEnhancer,
    );

    const sharedProps = getSharedProps(this.props, this.state);

    return (
      <Root {...sharedProps} {...rootProps}>
        {startEnhancer && (
          <StartEnhancer
            {...sharedProps}
            {...startEnhancerProps}
            $position={ENHANCER_POSITION.start}
          >
            {typeof startEnhancer === 'function'
              ? startEnhancer(sharedProps)
              : startEnhancer}
          </StartEnhancer>
        )}
        <BaseInput
          {...rest}
          adjoined={getAdjoinedProp(startEnhancer, endEnhancer)}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
        />
        {endEnhancer && (
          <EndEnhancer
            {...sharedProps}
            {...endEnhancerProps}
            $position={ENHANCER_POSITION.end}
          >
            {typeof endEnhancer === 'function'
              ? endEnhancer(sharedProps)
              : endEnhancer}
          </EndEnhancer>
        )}
      </Root>
    );
  }
}

function getAdjoinedProp(startEnhancer, endEnhancer): AdjoinedT {
  if (startEnhancer && endEnhancer) {
    return ADJOINED.both;
  } else if (startEnhancer) {
    return ADJOINED.left;
  } else if (endEnhancer) {
    return ADJOINED.right;
  }
  return ADJOINED.none;
}

export default Input;

/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import getBuiId from '../utils/get-bui-id';
import {getOverride, getOverrideProps} from '../helpers/overrides';
import type {InputPropsT, InternalStateT, AdjoinedT} from './types';
import {getSharedProps} from './utils';
import BaseInput from './base-input';
import {
  Label as StyledLabel,
  Root as StyledRoot,
  InputEnhancer as StyledInputEnhancer,
  Caption as StyledCaption,
} from './styled-components';
import {ADJOINED, ENHANCER_POSITION} from './constants';

class Input extends React.Component<InputPropsT, InternalStateT> {
  static defaultProps = {
    autoFocus: false,
    disabled: false,
    id: getBuiId(),
    error: false,
    onBlur: () => {},
    onFocus: () => {},
    overrides: {},
    required: false,
    size: 'default',
    label: null,
    caption: null,
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
    const {label, caption, startEnhancer, endEnhancer, ...rest} = this.props;

    const {
      Label: LabelOverride,
      Root: RootOverride,
      StartEnhancer: StartEnhancerOverride,
      EndEnhancer: EndEnhancerOverride,
      Caption: CaptionOverride,
    } = this.props.overrides;

    const Label = getOverride(LabelOverride) || StyledLabel;
    const Root = getOverride(RootOverride) || StyledRoot;
    const StartEnhancer =
      getOverride(StartEnhancerOverride) || StyledInputEnhancer;
    const EndEnhancer = getOverride(EndEnhancerOverride) || StyledInputEnhancer;
    const Caption = getOverride(CaptionOverride) || StyledCaption;

    const sharedProps = getSharedProps(this.props, this.state);

    const error = this.props.error;

    return (
      <React.Fragment>
        {label && (
          <Label
            {...getOverrideProps(LabelOverride)}
            {...sharedProps}
            htmlFor={this.props.id}
          >
            {typeof label === 'function' ? label(sharedProps) : label}
          </Label>
        )}
        <Root {...getOverrideProps(RootOverride)} {...sharedProps}>
          {startEnhancer && (
            <StartEnhancer
              {...getOverrideProps(StartEnhancerOverride)}
              {...sharedProps}
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
              {...getOverrideProps(EndEnhancerOverride)}
              {...sharedProps}
              $position={ENHANCER_POSITION.end}
            >
              {typeof endEnhancer === 'function'
                ? endEnhancer(sharedProps)
                : endEnhancer}
            </EndEnhancer>
          )}
        </Root>
        {(caption || error) && (
          <Caption {...getOverrideProps(CaptionOverride)} {...sharedProps}>
            {error && typeof error !== 'boolean'
              ? typeof error === 'function'
                ? error(sharedProps)
                : error
              : typeof caption === 'function'
                ? caption(sharedProps)
                : caption}
          </Caption>
        )}
      </React.Fragment>
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

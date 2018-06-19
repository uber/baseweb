// @flow
import * as React from 'react';
import type {InputPropsT, InternalStateT, AdjoinedT} from './types';
import {getSharedProps, getComponent, getComponentProps} from './utils';
import getBuiId from '../utils/get-bui-id';
import {
  BaseInput,
  StyledLabel,
  StyledRoot,
  StyledInputEnhancer,
  StyledCaption,
  ADJOINED,
} from './index';
import {ENHANCER_POSITION} from './constants';

class Input extends React.Component<InputPropsT, InternalStateT> {
  static defaultProps = {
    autoFocus: false,
    disabled: false,
    id: getBuiId(),
    error: false,
    onBlur: () => {},
    onFocus: () => {},
    override: {},
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

  onFocus = (e: SyntheticFocusEvent<HTMLInputElement>) => {
    this.setState({isFocused: true});
    this.props.onFocus(e);
  };

  onBlur = (e: SyntheticEvent<HTMLInputElement>) => {
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
    } = this.props.override;

    const Label = getComponent(LabelOverride, StyledLabel);
    const Root = getComponent(RootOverride, StyledRoot);
    const StartEnhancer = getComponent(
      StartEnhancerOverride,
      StyledInputEnhancer,
    );
    const EndEnhancer = getComponent(EndEnhancerOverride, StyledInputEnhancer);
    const Caption = getComponent(CaptionOverride, StyledCaption);

    const sharedProps = getSharedProps(this.props, this.state);

    const error = this.props.error;

    return (
      <React.Fragment>
        {label && (
          <Label
            {...getComponentProps(LabelOverride)}
            {...sharedProps}
            htmlFor={this.props.id}
          >
            {typeof label === 'function' ? label(sharedProps) : label}
          </Label>
        )}
        <Root {...getComponentProps(RootOverride)} {...sharedProps}>
          {startEnhancer && (
            <StartEnhancer
              {...getComponentProps(StartEnhancerOverride)}
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
              {...getComponentProps(EndEnhancerOverride)}
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
          <Caption {...getComponentProps(CaptionOverride)} {...sharedProps}>
            {error && typeof error !== 'boolean'
              ? typeof error === 'function' ? error(sharedProps) : error
              : typeof caption === 'function' ? caption(sharedProps) : caption}
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

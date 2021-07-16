/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {getOverrides, withOverrides} from '../helpers/overrides.js';

import {
  Root as StyledRoot,
  Label as StyledLabel,
  Input as StyledInput,
  RadioMarkInner as StyledRadioMarkInner,
  RadioMarkOuter as StyledRadioMarkOuter,
  Description as StyledDescription,
} from './styled-components.js';
import type {RadioPropsT, RadioStateT, RadioDefaultPropsT} from './types.js';

function isLabelTopLeft(labelPlacement) {
  return labelPlacement === 'top' || labelPlacement === 'left';
}

function isLabelBottomRight(labelPlacement) {
  return labelPlacement === 'bottom' || labelPlacement === 'right';
}

const stopPropagation = e => e.stopPropagation();

class Radio extends React.Component<RadioPropsT, RadioStateT> {
  static defaultProps: RadioDefaultPropsT = {
    overrides: {},
    containsInteractiveElement: false,
    checked: false,
    disabled: false,
    autoFocus: false,
    inputRef: React.createRef(),
    align: 'vertical',
    isError: false,
    error: false,
    onChange: () => {},
    onMouseEnter: () => {},
    onMouseLeave: () => {},
    onMouseDown: () => {},
    onMouseUp: () => {},
    onFocus: () => {},
    onBlur: () => {},
  };

  state = {
    isActive: false,
    isHovered: false,
  };

  componentDidMount() {
    if (this.props.autoFocus && this.props.inputRef.current) {
      this.props.inputRef.current.focus();
    }
    if (__DEV__ && this.props.isError) {
      console.warn(
        'baseui:Radio Property "isError" will be removed in the next major version. Use "error" property instead.',
      );
    }
  }

  onMouseEnter = (e: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({isHovered: true});
    this.props.onMouseEnter && this.props.onMouseEnter(e);
  };

  onMouseLeave = (e: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({isHovered: false});
    this.props.onMouseLeave && this.props.onMouseLeave(e);
  };

  onMouseDown = (e: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({isActive: true});
    this.props.onMouseDown && this.props.onMouseDown(e);
  };

  onMouseUp = (e: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({isActive: false});
    this.props.onMouseUp && this.props.onMouseUp(e);
  };

  render() {
    const {overrides = {}} = this.props;
    const [Root, rootProps] = getOverrides(overrides.Root, StyledRoot);
    const [Label, labelProps] = getOverrides(overrides.Label, StyledLabel);
    const [Input, inputProps] = getOverrides(overrides.Input, StyledInput);
    const [Description, descriptionProps] = getOverrides(
      overrides.Description,
      StyledDescription,
    );
    const [RadioMarkInner, radioMarkInnerProps] = getOverrides(
      overrides.RadioMarkInner,
      StyledRadioMarkInner,
    );
    const [RadioMarkOuter, radioMarkOuterProps] = getOverrides(
      overrides.RadioMarkOuter,
      StyledRadioMarkOuter,
    );

    const sharedProps = {
      $align: this.props.align,
      $checked: this.props.checked,
      $disabled: this.props.disabled,
      $hasDescription: !!this.props.description,
      $isActive: this.state.isActive,
      $isError: this.props.isError,
      $error: this.props.error,
      $isFocused: this.props.isFocused,
      $isFocusVisible: this.props.isFocused && this.props.isFocusVisible,
      $isHovered: this.state.isHovered,
      $labelPlacement: this.props.labelPlacement,
      $required: this.props.required,
      $value: this.props.value,
    };

    const label = (
      <Label {...sharedProps} {...labelProps}>
        {this.props.containsInteractiveElement ? (
          // Prevents the event from bubbling up to the label and moving focus to the radio button
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
          <div onClick={e => e.preventDefault()}>{this.props.children}</div>
        ) : (
          this.props.children
        )}
      </Label>
    );

    return (
      <React.Fragment>
        <Root
          data-baseweb="radio"
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
          onMouseDown={this.onMouseDown}
          onMouseUp={this.onMouseUp}
          {...sharedProps}
          {...rootProps}
        >
          {isLabelTopLeft(this.props.labelPlacement) && label}
          <RadioMarkOuter {...sharedProps} {...radioMarkOuterProps}>
            <RadioMarkInner {...sharedProps} {...radioMarkInnerProps} />
          </RadioMarkOuter>
          <Input
            aria-invalid={this.props.error || this.props.isError || null}
            checked={this.props.checked}
            disabled={this.props.disabled}
            name={this.props.name}
            onBlur={this.props.onBlur}
            onFocus={this.props.onFocus}
            // Prevent a second click event from firing when label is clicked.
            // See https://github.com/uber/baseweb/issues/3847 & https://github.com/uber/baseweb/issues/4033
            onClick={stopPropagation}
            onChange={this.props.onChange}
            ref={this.props.inputRef}
            required={this.props.required}
            tabIndex={this.props.tabIndex}
            type="radio"
            value={this.props.value}
            {...sharedProps}
            {...inputProps}
          />
          {isLabelBottomRight(this.props.labelPlacement) && label}
        </Root>

        {!!this.props.description && (
          <Description {...sharedProps} {...descriptionProps}>
            {this.props.description}
          </Description>
        )}
      </React.Fragment>
    );
  }
}

export default withOverrides<
  React.Config<RadioPropsT, RadioDefaultPropsT>,
  mixed,
>(Radio, 'Radio');

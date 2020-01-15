/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {getOverride, getOverrideProps} from '../helpers/overrides.js';
import type {PropsT, DefaultPropsT, StatelessStateT} from './types.js';
import {
  Checkmark as StyledCheckmark,
  Input as StyledInput,
  Label as StyledLabel,
  Root as StyledRoot,
  Toggle as StyledToggle,
  ToggleInner as StyledToggleInner,
  ToggleTrack as StyledToggleTrack,
} from './styled-components.js';
import {STYLE_TYPE} from './constants.js';

class StatelessCheckbox extends React.Component<PropsT, StatelessStateT> {
  static defaultProps: DefaultPropsT = {
    overrides: {},
    checked: false,
    disabled: false,
    autoFocus: false,
    isIndeterminate: false,
    inputRef: React.createRef(),
    isError: false,
    type: 'checkbox',
    checkmarkType: STYLE_TYPE.default,
    onChange: () => {},
    onMouseEnter: () => {},
    onMouseLeave: () => {},
    onMouseDown: () => {},
    onMouseUp: () => {},
    onFocus: () => {},
    onBlur: () => {},
  };

  state = {
    isFocused: this.props.autoFocus || false,
    isHovered: false,
    isActive: false,
  };

  componentDidMount() {
    const {autoFocus, inputRef} = this.props;
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }

    // TODO(v10)
    if (__DEV__ && this.props.checkmarkType === STYLE_TYPE.toggle) {
      console.warn(
        "baseui:Checkbox The STYLE_TYPE.toggle value on the 'checkmarkType' prop does not conform to the current base design specification. " +
          'Please update your code to STYLE_TYPE.toggle_round. This will be updated automatically in a future major version.',
      );
    }
  }

  onMouseEnter = (e: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({isHovered: true});
    this.props.onMouseEnter(e);
  };

  onMouseLeave = (e: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({isHovered: false, isActive: false});
    this.props.onMouseLeave(e);
  };

  onMouseDown = (e: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({isActive: true});
    this.props.onMouseDown(e);
  };

  onMouseUp = (e: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({isActive: false});
    this.props.onMouseUp(e);
  };

  onFocus = (e: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({isFocused: true});
    this.props.onFocus(e);
  };

  onBlur = (e: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({isFocused: false});
    this.props.onBlur(e);
  };

  isToggle = () => {
    return (
      this.props.checkmarkType === STYLE_TYPE.toggle ||
      this.props.checkmarkType === STYLE_TYPE.toggle_round
    );
  };

  render() {
    const {checkmarkType} = this.props;
    const {
      overrides = {},
      onChange,
      labelPlacement = this.isToggle() ? 'left' : 'right',
      inputRef,
      isIndeterminate,
      isError,
      disabled,
      value,
      name,
      type,
      checked,
      children,
      required,
      title,
    } = this.props;

    const {
      Root: RootOverride,
      Checkmark: CheckmarkOverride,
      Label: LabelOverride,
      Input: InputOverride,
      Toggle: ToggleOverride,
      ToggleInner: ToggleInnerOverride,
      ToggleTrack: ToggleTrackOverride,
    } = overrides;

    const Root = getOverride(RootOverride) || StyledRoot;
    const Checkmark = getOverride(CheckmarkOverride) || StyledCheckmark;
    const Label = getOverride(LabelOverride) || StyledLabel;
    const Input = getOverride(InputOverride) || StyledInput;
    const Toggle = getOverride(ToggleOverride) || StyledToggle;
    const ToggleInner = getOverride(ToggleInnerOverride) || StyledToggleInner;
    const ToggleTrack = getOverride(ToggleTrackOverride) || StyledToggleTrack;

    const inputEvents = {
      onChange,
      onFocus: this.onFocus,
      onBlur: this.onBlur,
    };
    const mouseEvents = {
      onMouseEnter: this.onMouseEnter,
      onMouseLeave: this.onMouseLeave,
      onMouseDown: this.onMouseDown,
      onMouseUp: this.onMouseUp,
    };
    const sharedProps = {
      $isFocused: this.state.isFocused,
      $isHovered: this.state.isHovered,
      $isActive: this.state.isActive,
      $isError: isError,
      $checked: checked,
      $isIndeterminate: isIndeterminate,
      $required: required,
      $disabled: disabled,
      $value: value,
      $checkmarkType: checkmarkType,
    };
    // TODO(v10) - add check for children (#2172)
    const labelComp = (
      <Label
        $labelPlacement={labelPlacement}
        {...sharedProps}
        {...getOverrideProps(LabelOverride)}
      >
        {children}
      </Label>
    );
    return (
      <Root
        data-baseweb="checkbox"
        title={title || null}
        $labelPlacement={labelPlacement}
        {...sharedProps}
        {...mouseEvents}
        {...getOverrideProps(RootOverride)}
      >
        {(labelPlacement === 'top' || labelPlacement === 'left') && labelComp}
        {this.isToggle() ? (
          <ToggleTrack
            role="checkbox"
            aria-checked={checked}
            {...sharedProps}
            {...getOverrideProps(ToggleTrackOverride)}
          >
            <Toggle {...sharedProps} {...getOverrideProps(ToggleOverride)}>
              <ToggleInner
                {...sharedProps}
                {...getOverrideProps(ToggleInnerOverride)}
              />
            </Toggle>
          </ToggleTrack>
        ) : (
          <Checkmark
            role="checkbox"
            checked={checked}
            aria-checked={checked}
            {...sharedProps}
            {...getOverrideProps(CheckmarkOverride)}
          />
        )}
        <Input
          value={value}
          name={name}
          checked={checked}
          required={required}
          aria-invalid={isError || null}
          aria-required={required || null}
          disabled={disabled}
          type={type}
          ref={inputRef}
          {...sharedProps}
          {...inputEvents}
          {...getOverrideProps(InputOverride)}
        />
        {(labelPlacement === 'bottom' || labelPlacement === 'right') &&
          labelComp}
      </Root>
    );
  }
}

export default StatelessCheckbox;

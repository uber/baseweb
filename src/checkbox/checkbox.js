/*
Copyright (c) Uber Technologies, Inc.

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
import {isFocusVisible} from '../utils/focusVisible.js';

const stopPropagation = e => e.stopPropagation();

class StatelessCheckbox extends React.Component<PropsT, StatelessStateT> {
  static defaultProps: DefaultPropsT = {
    overrides: {},
    checked: false,
    containsInteractiveElement: false,
    disabled: false,
    autoFocus: false,
    isIndeterminate: false,
    inputRef: React.createRef(),
    isError: false,
    error: false,
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
    isFocusVisible: false,
    isHovered: false,
    isActive: false,
  };

  componentDidMount() {
    const {autoFocus, inputRef} = this.props;
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }

    // TODO(v11)
    if (__DEV__) {
      if (this.props.checkmarkType === STYLE_TYPE.toggle) {
        console.warn(
          "baseui:Checkbox The STYLE_TYPE.toggle value on the 'checkmarkType' prop does not conform to the current base design specification. " +
            'Please update your code to STYLE_TYPE.toggle_round. This will be updated automatically in a future major version.',
        );
      }
      if (this.props.isError) {
        console.warn(
          'baseui:Checkbox Property "isError" will be removed in the next major version. Use "error" property instead.',
        );
      }
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
    if (isFocusVisible(e)) {
      this.setState({isFocusVisible: true});
    }
  };

  onBlur = (e: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({isFocused: false});
    this.props.onBlur(e);
    if (this.state.isFocusVisible !== false) {
      this.setState({isFocusVisible: false});
    }
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
      error,
      disabled,
      value,
      name,
      type,
      checked,
      children,
      required,
      title,
      ariaLabel,
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
      $isFocusVisible: this.state.isFocusVisible,
      $isHovered: this.state.isHovered,
      $isActive: this.state.isActive,
      $isError: isError,
      $error: error,
      $checked: checked,
      $isIndeterminate: isIndeterminate,
      $required: required,
      $disabled: disabled,
      $value: value,
      $checkmarkType: checkmarkType,
    };
    // TODO(v11) - add check for children (#2172)
    const labelComp = (
      <Label
        $labelPlacement={labelPlacement}
        {...sharedProps}
        {...getOverrideProps(LabelOverride)}
      >
        {this.props.containsInteractiveElement ? (
          // Prevents the event from bubbling up to the label and moving focus to the radio button
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
          <div onClick={e => e.preventDefault()}>{children}</div>
        ) : (
          children
        )}
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
            aria-checked={isIndeterminate ? 'mixed' : checked}
            aria-invalid={error || isError || null}
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
            aria-checked={isIndeterminate ? 'mixed' : checked}
            aria-invalid={error || isError || null}
            {...sharedProps}
            {...getOverrideProps(CheckmarkOverride)}
          />
        )}
        <Input
          value={value}
          name={name}
          checked={checked}
          required={required}
          aria-label={ariaLabel}
          aria-checked={isIndeterminate ? 'mixed' : checked}
          aria-describedby={this.props['aria-describedby']}
          aria-errormessage={this.props['aria-errormessage']}
          aria-invalid={error || isError || null}
          aria-required={required || null}
          disabled={disabled}
          type={type}
          ref={inputRef}
          // Prevent a second click event from firing when label is clicked.
          // See https://github.com/uber/baseweb/issues/3847
          onClick={stopPropagation}
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

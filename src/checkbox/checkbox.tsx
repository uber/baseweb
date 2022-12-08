/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { getOverride, getOverrideProps } from '../helpers/overrides';
import type { CheckboxProps, DefaultProps, CheckboxState } from './types';
import {
  Checkmark as StyledCheckmark,
  Input as StyledInput,
  Label as StyledLabel,
  Root as StyledRoot,
  Toggle as StyledToggle,
  ToggleTrack as StyledToggleTrack,
} from './styled-components';
import { STYLE_TYPE } from './constants';
import { isFocusVisible } from '../utils/focusVisible';

import type { ChangeEvent } from 'react';

// @ts-ignore
const stopPropagation = (e) => e.stopPropagation();

class StatelessCheckbox extends React.Component<CheckboxProps, CheckboxState> {
  static defaultProps: DefaultProps = {
    overrides: {}, // todo(flow->ts): missing field in flow types
    checked: false,
    containsInteractiveElement: false,
    disabled: false,
    autoFocus: false,
    isIndeterminate: false,
    inputRef: React.createRef(),
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
    const { autoFocus, inputRef } = this.props;
    // @ts-ignore
    if (autoFocus && inputRef.current) {
      // @ts-ignore
      inputRef.current.focus();
    }
  }

  onMouseEnter = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ isHovered: true });
    // @ts-ignore
    this.props.onMouseEnter(e);
  };

  onMouseLeave = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ isHovered: false, isActive: false });
    // @ts-ignore
    this.props.onMouseLeave(e);
  };

  onMouseDown = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ isActive: true });
    // @ts-ignore
    this.props.onMouseDown(e);
  };

  onMouseUp = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ isActive: false });
    // @ts-ignore
    this.props.onMouseUp(e);
  };

  onFocus = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ isFocused: true });
    // @ts-ignore
    this.props.onFocus(e);
    if (isFocusVisible(e)) {
      this.setState({ isFocusVisible: true });
    }
  };

  onBlur = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ isFocused: false });
    // @ts-ignore
    this.props.onBlur(e);
    if (this.state.isFocusVisible !== false) {
      this.setState({ isFocusVisible: false });
    }
  };

  render() {
    const {
      overrides = {},
      onChange,
      labelPlacement = this.props.checkmarkType === STYLE_TYPE.toggle ? 'left' : 'right',
      inputRef,
      isIndeterminate,
      error,
      disabled,
      value,
      id,
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
      ToggleTrack: ToggleTrackOverride,
    } = overrides;

    const Root = getOverride(RootOverride) || StyledRoot;
    const Checkmark = getOverride(CheckmarkOverride) || StyledCheckmark;
    const Label = getOverride(LabelOverride) || StyledLabel;
    const Input = getOverride(InputOverride) || StyledInput;
    const Toggle = getOverride(ToggleOverride) || StyledToggle;
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
      $error: error,
      $checked: checked,
      $isIndeterminate: isIndeterminate,
      $required: required,
      $disabled: disabled,
      $value: value,
    };

    const labelComp = children && (
      <Label $labelPlacement={labelPlacement} {...sharedProps} {...getOverrideProps(LabelOverride)}>
        {this.props.containsInteractiveElement ? (
          // Prevents the event from bubbling up to the label and moving focus to the radio button
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
          <div onClick={(e) => e.preventDefault()}>{children}</div>
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
        {this.props.checkmarkType === STYLE_TYPE.toggle ? (
          <ToggleTrack {...sharedProps} {...getOverrideProps(ToggleTrackOverride)}>
            <Toggle {...sharedProps} {...getOverrideProps(ToggleOverride)} />
          </ToggleTrack>
        ) : (
          <Checkmark {...sharedProps} {...getOverrideProps(CheckmarkOverride)} />
        )}
        <Input
          value={value}
          id={id}
          name={name}
          checked={checked}
          required={required}
          aria-label={this.props['aria-label'] || this.props.ariaLabel}
          aria-checked={isIndeterminate ? 'mixed' : checked}
          aria-describedby={this.props['aria-describedby']}
          aria-errormessage={this.props['aria-errormessage']}
          aria-invalid={error || null}
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
        {(labelPlacement === 'bottom' || labelPlacement === 'right') && labelComp}
      </Root>
    );
  }
}

export default StatelessCheckbox;

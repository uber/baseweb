/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {getOverrides} from '../helpers/overrides.js';
import type {
  PropsT,
  DefaultPropsT,
  StatelessStateT,
  SharedStylePropsT,
} from './types.js';
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

  render() {
    const {checkmarkType} = this.props;
    const {
      overrides = {},
      onChange,
      labelPlacement = checkmarkType === STYLE_TYPE.toggle ? 'left' : 'right',
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

    const [Root, getRootProps] = getOverrides<SharedStylePropsT>(
      RootOverride,
      StyledRoot,
    );
    const [Checkmark, getCheckmarkProps] = getOverrides<SharedStylePropsT>(
      CheckmarkOverride,
      StyledCheckmark,
    );
    const [Label, getLabelProps] = getOverrides<SharedStylePropsT>(
      LabelOverride,
      StyledLabel,
    );
    const [Input, getInputProps] = getOverrides<SharedStylePropsT>(
      InputOverride,
      StyledInput,
    );
    const [Toggle, getToggleProps] = getOverrides<SharedStylePropsT>(
      ToggleOverride,
      StyledToggle,
    );
    const [ToggleInner, getToggleInnerProps] = getOverrides<SharedStylePropsT>(
      ToggleInnerOverride,
      StyledToggleInner,
    );
    const [ToggleTrack, getToggleTrackProps] = getOverrides<SharedStylePropsT>(
      ToggleTrackOverride,
      StyledToggleTrack,
    );

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
      $isError: Boolean(isError),
      $checked: Boolean(checked),
      $isIndeterminate: Boolean(isIndeterminate),
      $labelPlacement: labelPlacement,
      $required: Boolean(required),
      $disabled: Boolean(disabled),
      $value: value || '',
      $checkmarkType: checkmarkType,
    };

    const labelComp = <Label {...getLabelProps(sharedProps)}>{children}</Label>;
    return (
      <Root
        data-baseweb="checkbox"
        {...getRootProps({
          'data-baseweb': 'checkbox',
          ...mouseEvents,
          ...sharedProps,
        })}
      >
        {(labelPlacement === 'top' || labelPlacement === 'left') && labelComp}
        {checkmarkType === STYLE_TYPE.toggle ? (
          <ToggleTrack {...getToggleTrackProps(sharedProps)}>
            <Toggle {...getToggleProps(sharedProps)}>
              <ToggleInner {...getToggleInnerProps(sharedProps)} />
            </Toggle>
          </ToggleTrack>
        ) : (
          <Checkmark {...getCheckmarkProps({checked, ...sharedProps})} />
        )}
        <Input
          {...getInputProps({
            value,
            name,
            checked,
            required,
            disabled,
            type,
            ref: inputRef,
            'aria-invalid': isError || null,
            'aria-required': required || null,
            ...sharedProps,
            ...inputEvents,
          })}
        />
        {(labelPlacement === 'bottom' || labelPlacement === 'right') &&
          labelComp}
      </Root>
    );
  }
}

export default StatelessCheckbox;

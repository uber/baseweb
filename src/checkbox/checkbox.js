/*
MIT License

Copyright (c) 2018 Uber Technologies, Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/
// @flow
import React from 'react';
import {getOverride, getOverrideProps} from '../helpers/overrides';
import type {PropsT, DefaultPropsT, StatelessStateT} from './types';
import {
  Checkmark as StyledCheckmark,
  Input as StyledInput,
  Label as StyledLabel,
  Root as StyledRoot,
} from './styled-components';
import {STYLE_TYPE} from './constants';

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
    } = overrides;

    const Root = getOverride(RootOverride) || StyledRoot;
    const Checkmark = getOverride(CheckmarkOverride) || StyledCheckmark;
    const Label = getOverride(LabelOverride) || StyledLabel;
    const Input = getOverride(InputOverride) || StyledInput;

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
        $labelPlacement={labelPlacement}
        {...sharedProps}
        {...mouseEvents}
        {...getOverrideProps(RootOverride)}
      >
        {(labelPlacement === 'top' || labelPlacement === 'left') && labelComp}
        <Checkmark
          checked={checked}
          {...sharedProps}
          {...getOverrideProps(CheckmarkOverride)}
        />
        <Input
          value={value}
          name={name}
          checked={checked}
          required={required}
          aria-invalid={isError || null}
          aria-required={required || null}
          disabled={disabled}
          type={type}
          $ref={inputRef}
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

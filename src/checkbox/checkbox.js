// @flow
import React from 'react';
import type {PropsT, DefaultPropsT} from './types';

class StatelessCheckbox extends React.Component<PropsT> {
  static defaultProps: DefaultPropsT = {
    checked: false,
    disabled: false,
    autoFocus: false,
    isIndeterminate: false,
    labelPlacement: 'right',
    inputRef: React.createRef(),
    isError: false,
    label: '',
    onChange: () => {},
    onMouseEnter: () => {},
    onMouseLeave: () => {},
    onFocus: () => {},
    onBlur: () => {},
  };

  state = {
    isFocused: this.props.autoFocus || false,
    isHovered: false,
  };

  componentDidMount() {
    const {autoFocus, inputRef} = this.props;
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }

  onMouseEnter = (e: SyntheticFocusEvent<HTMLInputElement>) => {
    this.setState({isHovered: true});
    this.props.onMouseEnter(e);
  };

  onMouseLeave = (e: SyntheticEvent<HTMLInputElement>) => {
    this.setState({isHovered: false});
    this.props.onMouseLeave(e);
  };

  onFocus = (e: SyntheticFocusEvent<HTMLInputElement>) => {
    this.setState({isFocused: true});
    this.props.onFocus(e);
  };

  onBlur = (e: SyntheticEvent<HTMLInputElement>) => {
    this.setState({isFocused: false});
    this.props.onBlur(e);
  };

  onMouseDown = (e: SyntheticEvent<HTMLInputElement>) => {
    this.onFocus(e);
  };

  onMouseUp = (e: SyntheticEvent<HTMLInputElement>) => {
    this.onBlur(e);
  };

  render() {
    const {
      components,
      onChange,
      labelPlacement,
      label,
      inputRef,
      isIndeterminate,
      isError,
      disabled,
      checked,
      $theme,
    } = this.props;
    const {Root, Checkmark, Label, Input} = components;

    const events = {
      onChange,
      onMouseEnter: this.onMouseEnter,
      onMouseLeave: this.onMouseLeave,
      onFocus: this.onFocus,
      onBlur: this.onBlur,
      onMouseDown: this.onMouseDown,
      onMouseUp: this.onMouseUp,
    };
    const labelComp = (
      <Label
        disabled={disabled}
        $labelPlacement={labelPlacement}
        $theme={$theme}
        $isFocused={this.state.isFocused}
        $isHovered={this.state.isHovered}
        {...events}
      >
        {label}
      </Label>
    );
    return (
      <Root
        disabled={disabled}
        $isError={isError}
        $theme={$theme}
        $labelPlacement={labelPlacement}
      >
        {(labelPlacement === 'top' || labelPlacement === 'left') && labelComp}
        <Checkmark
          disabled={disabled}
          $isError={isError}
          checked={checked}
          $isFocused={this.state.isFocused}
          $isHovered={this.state.isHovered}
          $theme={$theme}
          $isIndeterminate={isIndeterminate}
        />
        <Input
          disabled={disabled}
          type="checkbox"
          $theme={$theme}
          $ref={inputRef}
          {...events}
        />
        {(labelPlacement === 'bottom' || labelPlacement === 'right') &&
          labelComp}
      </Root>
    );
  }
}

export default StatelessCheckbox;

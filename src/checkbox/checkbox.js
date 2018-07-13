// @flow
import React from 'react';
import type {PropsT, DefaultPropsT, StatelessStateT} from './types';
import {
  Checkmark as StyledCheckmark,
  Input as StyledInput,
  Label as StyledLabel,
  Root as StyledRoot,
} from './styled-components';

class StatelessCheckbox extends React.Component<PropsT, StatelessStateT> {
  static defaultProps: DefaultPropsT = {
    components: {},
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

  onMouseEnter = (e: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({isHovered: true});
    this.props.onMouseEnter(e);
  };

  onMouseLeave = (e: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({isHovered: false});
    this.props.onMouseLeave(e);
  };

  onFocus = (e: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({isFocused: true});
    this.props.onFocus(e);
  };

  onBlur = (e: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({isFocused: false});
    this.props.onBlur(e);
  };

  onMouseDown = (e: SyntheticInputEvent<HTMLInputElement>) => {
    this.onFocus(e);
  };

  onMouseUp = (e: SyntheticInputEvent<HTMLInputElement>) => {
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
      required,
    } = this.props;
    const {
      Root = StyledRoot,
      Checkmark = StyledCheckmark,
      Label = StyledLabel,
      Input = StyledInput,
    } = components;
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
        $labelPlacement={labelPlacement}
      >
        {(labelPlacement === 'top' || labelPlacement === 'left') && labelComp}
        <Checkmark
          disabled={disabled}
          $isError={isError}
          checked={checked}
          $isFocused={this.state.isFocused}
          $isHovered={this.state.isHovered}
          $isIndeterminate={isIndeterminate}
        />
        <Input
          required={required}
          aria-invalid={isError || null}
          aria-required={required || null}
          disabled={disabled}
          type="checkbox"
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

// @flow
import React from 'react';
import type {PropsT, DefaultPropsT} from './types';

class StatelessCheckbox extends React.Component<PropsT> {
  static defaultProps: DefaultPropsT = {
    checked: false,
    disabled: false,
    isFocused: false,
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

  componentDidMount() {
    const {isFocused, inputRef} = this.props;
    if (isFocused) {
      inputRef.current && inputRef.current.focus();
    }
  }

  render() {
    const {
      components,
      onChange,
      onMouseEnter,
      onMouseLeave,
      onFocus,
      onBlur,
      labelPlacement,
      label,
      inputRef,
      isFocused,
      isIndeterminate,
      isError,
      disabled,
      checked,
      $theme,
    } = this.props;
    const {Root, Checkmark, Label, Input} = components;

    const events = {
      onChange,
      onMouseEnter,
      onMouseLeave,
      onFocus,
      onBlur,
    };
    const labelComp = (
      <Label
        disabled={disabled}
        $labelPlacement={labelPlacement}
        $theme={$theme}
      >
        {label}
      </Label>
    );
    return (
      <Root disabled={disabled} $isError={isError} $theme={$theme}>
        {(labelPlacement === 'top' || labelPlacement === 'left') && labelComp}
        <Checkmark
          disabled={disabled}
          $isError={isError}
          checked={checked}
          $isFocused={isFocused}
          $theme={$theme}
          $isIndeterminate={isIndeterminate}
        />
        <Input type="checkbox" $theme={$theme} $ref={inputRef} {...events} />
        {(labelPlacement === 'bottom' || labelPlacement === 'right') &&
          labelComp}
      </Root>
    );
  }
}

export default StatelessCheckbox;

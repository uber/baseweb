// @flow
import React from 'react';
import type {Props, DefaultProps} from './types';

class StatelessCheckbox extends React.Component<Props> {
  static defaultProps: DefaultProps = {
    checked: false,
    disabled: false,
    isFocused: false,
    isIndeterminate: false,
    placement: 'right',
    inputRef: React.createRef(),
    error: false,
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
      placement,
      label,
      inputRef,
      isFocused,
      isIndeterminate,
      error,
      ...sharedProps
    } = this.props;
    const {Root, Checkmark, Label, Input} = components;

    const events = {
      onChange,
      onMouseEnter,
      onMouseLeave,
      onFocus,
      onBlur,
    };
    const getLabel = () => (
      <Label placement={placement} {...sharedProps} $error={error}>
        {label}
      </Label>
    );
    return (
      <Root {...sharedProps} $error={error}>
        {(placement === 'top' || placement === 'left') && getLabel()}
        <Checkmark
          {...sharedProps}
          $error={error}
          $isFocused={isFocused}
          $isIndeterminate={isIndeterminate}
        />
        <Input type="checkbox" $ref={inputRef} {...sharedProps} {...events} />
        {(placement === 'bottom' || placement === 'right') && getLabel()}
      </Root>
    );
  }
}

export default StatelessCheckbox;

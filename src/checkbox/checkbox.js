// @flow
import React from 'react';
import type {Props, DefaultProps} from './types';

class StatelessCheckbox extends React.Component<Props> {
  static defaultProps: DefaultProps = {
    checked: false,
    disabled: false,
    $isFocused: false,
    $isIndeterminate: false,
    $placement: 'right',
    $inputRef: React.createRef(),
    $error: false,
    $label: '',
    onChange: () => {},
    onMouseEnter: () => {},
    onMouseLeave: () => {},
    onFocus: () => {},
    onBlur: () => {},
  };

  componentDidMount() {
    if (this.props.$isFocused) {
      this.props.$inputRef.current.focus();
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
      onKeyPress,
      $placement,
      $label,
      $inputRef,
      $isFocused,
      $isIndeterminate,
      $error,
      ...sharedProps
    } = this.props;
    const {Root, Checkmark, Label, Input} = components;

    const events = {
      onChange,
      onMouseEnter,
      onMouseLeave,
      onFocus,
      onBlur,
      onKeyPress,
    };
    events.onKeyPress = event => {
      const keycode = event.keyCode ? event.keyCode : event.which;
      if (keycode === 13) {
        $inputRef.current.click();
        event.stopPropagation();
      }
      if (onKeyPress) {
        onKeyPress(event);
      }
    };
    const getLabel = () => (
      <Label $placement={$placement} {...sharedProps} $error={$error}>
        {$label}
      </Label>
    );
    return (
      <Root {...sharedProps} $error={$error}>
        {($placement === 'top' || $placement === 'left') && getLabel()}
        <Checkmark
          {...sharedProps}
          $error={$error}
          $isFocused={$isFocused}
          $isIndeterminate={$isIndeterminate}
        />
        <Input type="checkbox" $ref={$inputRef} {...sharedProps} {...events} />
        {($placement === 'bottom' || $placement === 'right') && getLabel()}
      </Root>
    );
  }
}

export default StatelessCheckbox;

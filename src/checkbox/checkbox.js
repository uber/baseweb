// @flow
import React from 'react';
import type {Props, DefaultProps} from './types';
import {StyledRoot, StyledCheckmark, StyledLabel, StyledInput} from './index';

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
    const {
      Root = StyledRoot,
      Checkmark = StyledCheckmark,
      Label = StyledLabel,
      Input = StyledInput,
    } = components;

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
    return (
      <Root {...sharedProps} $error={$error}>
        {($placement === 'top' || $placement === 'left') && (
          <Label $placement={$placement} {...sharedProps}>
            {$label}
          </Label>
        )}
        <Checkmark
          {...sharedProps}
          $error={$error}
          $isFocused={$isFocused}
          $isIndeterminate={$isIndeterminate}
        />
        <Input type="checkbox" $ref={$inputRef} {...sharedProps} {...events} />
        {($placement === 'bottom' || $placement === 'right') && (
          <Label $placement={$placement} {...sharedProps} $error={$error}>
            {$label}
          </Label>
        )}
      </Root>
    );
  }
}

export default StatelessCheckbox;

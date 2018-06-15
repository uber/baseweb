// @flow
import React from 'react';
import type {Props, DefaultProps} from './types';
import {StyledRoot, StyledCheckmark, StyledLabel} from './index';

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
        <input
          ref={$inputRef}
          type="checkbox"
          // tricky style for focus event cause display: none doesn't work
          style={{
            opacity: 0,
            width: 0,
            overflow: 'hidden',
            margin: 0,
            padding: 0,
          }}
          {...sharedProps}
          {...events}
        />
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

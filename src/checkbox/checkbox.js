// @flow
import * as React from 'react';
import type {Props, DefaultProps} from './types';

class StatelessCheckbox extends React.Component<Props & DefaultProps> {
  static defaultProps: DefaultProps = {
    checked: false,
    disabled: false,
    $isFocused: false,
    $isIndeterminate: false,
    $placement: 'right',
    $inputRef: React.createRef(),
    $error: false,
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
      components: {Checkmark, Label, Root},
      $inputRef,
      $isFocused,
      $error,
      $placement,
      checked,
      $label,
      disabled,
      onChange,
      onMouseEnter,
      onMouseLeave,
      onFocus,
      onBlur,
      ...rest
    } = this.props;

    const sharedProps = {
      $isFocused,
      $error,
      $placement,
      disabled,
    };
    const events = {
      onChange,
      onMouseEnter,
      onMouseLeave,
      onFocus,
      onBlur,
    };

    return (
      <Root {...sharedProps}>
        {($placement === 'top' || $placement === 'left') && (
          <Label {...sharedProps} {...rest}>
            {$label}
          </Label>
        )}
        <Checkmark
          {...sharedProps}
          checked={checked}
          disabled={disabled}
          {...rest}
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
          checked={checked}
          disabled={disabled}
          {...events}
        />
        {($placement === 'bottom' || $placement === 'right') && (
          <Label {...sharedProps} {...rest}>
            {$label}
          </Label>
        )}
      </Root>
    );
  }
}

export default StatelessCheckbox;

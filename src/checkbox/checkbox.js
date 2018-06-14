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
      components: {Checkmark, Label, Root},
      onChange,
      onMouseEnter,
      onMouseLeave,
      onFocus,
      onBlur,
      $placement,
      $label,
      $inputRef,
      ...sharedProps
    } = this.props;

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
          <Label $placement={$placement} {...sharedProps}>
            {$label}
          </Label>
        )}
        <Checkmark {...sharedProps} />
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
          <Label $placement={$placement} {...sharedProps}>
            {$label}
          </Label>
        )}
      </Root>
    );
  }
}

export default StatelessCheckbox;

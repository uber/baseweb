// @flow
import * as React from 'react';
import type {Props, DefaultProps} from './types';

class StatelessInput extends React.Component<Props & DefaultProps> {
  static defaultProps: DefaultProps = {
    type: 'text',
    value: '',
    placeholder: '',
    disabled: false,
    $inputRef: React.createRef(),
    $isFocused: false,
    $error: false,
    $adjoined: 'none',
    $size: 'default',
    onChange: () => {},
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
      components: {Root, Input, Before, After},
      $inputRef,
      $isFocused,
      $error,
      $adjoined,
      $size,
      type,
      value,
      ...rest
    } = this.props;

    const sharedProps = {
      $isFocused,
      $error,
      $adjoined,
      $size,
      $disabled: this.props.disabled,
    };

    return (
      <Root {...sharedProps}>
        {Before ? <Before {...sharedProps} /> : null}
        <Input
          {...sharedProps}
          {...rest}
          $ref={$inputRef}
          type={type}
          value={value}
        />
        {After ? <After {...sharedProps} /> : null}
      </Root>
    );
  }
}

export default StatelessInput;

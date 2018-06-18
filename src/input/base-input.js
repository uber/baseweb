// @flow
import * as React from 'react';
import type {Props, DefaultProps} from './types';

class BaseInput extends React.Component<Props & DefaultProps> {
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

  state = {
    $isFocused: this.props.$isFocused || false,
  };

  componentDidMount() {
    if (this.props.$isFocused) {
      this.props.$inputRef.current.focus();
    }
  }

  onFocus = (e: any) => {
    this.setState({$isFocused: true});
    this.props.onFocus(e);
  };

  onBlur = (e: any) => {
    this.setState({$isFocused: false});
    this.props.onBlur(e);
  };

  render() {
    const {
      components: {InputContainer, Input, Before, After},
      $inputRef,
      $isFocused,
      $error,
      $adjoined,
      $size,
      type,
      value,
      ...rest
    } = this.props;

    const sharedProps = {};
    for (let key in this.props) {
      if (key[0] === '$') {
        sharedProps[key] = this.props[key];
      }
    }
    sharedProps.$disabled = this.props.disabled;
    sharedProps.$isFocused = this.state.$isFocused;

    // const sharedProps = {
    //   $isFocused,
    //   $error,
    //   $adjoined,
    //   $size,
    //   $disabled: this.props.disabled,
    // };

    return (
      <InputContainer {...sharedProps}>
        {Before ? <Before {...sharedProps} /> : null}
        <Input
          {...rest}
          {...sharedProps}
          $ref={$inputRef}
          type={type}
          value={value}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
        />
        {After ? <After {...sharedProps} /> : null}
      </InputContainer>
    );
  }
}

export default BaseInput;

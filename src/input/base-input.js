// @flow
import * as React from 'react';
import type {BaseInputPropsT, InternalStateT} from './types';
import getBuiId from '../utils/get-bui-id';
import {ADJOINED, SIZE} from './constants';
import {getSharedProps, getComponent, getComponentProps} from './utils';
import {StyledInputContainer, StyledInput} from './index';

class BaseInput extends React.Component<BaseInputPropsT, InternalStateT> {
  static defaultProps = {
    adjoined: ADJOINED.none,
    autoFocus: false,
    disabled: false,
    error: false,
    id: getBuiId(),
    inputRef: React.createRef(),
    onBlur: () => {},
    onChange: () => {},
    onFocus: () => {},
    override: {},
    placeholder: '',
    required: false,
    size: SIZE.default,
    type: 'text',
    value: '',
  };

  state = {
    isFocused: this.props.autoFocus || false,
  };

  componentDidMount() {
    const {autoFocus, inputRef} = this.props;
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }

  onFocus = (e: SyntheticFocusEvent<HTMLInputElement>) => {
    this.setState({isFocused: true});
    this.props.onFocus(e);
  };

  onBlur = (e: SyntheticEvent<HTMLInputElement>) => {
    this.setState({isFocused: false});
    this.props.onBlur(e);
  };

  getInputProps = () => {
    const {
      disabled,
      error,
      id,
      inputRef,
      onChange,
      placeholder,
      required,
      type,
      value,
    } = this.props;
    return {
      $ref: inputRef,
      'aria-invalid': !!error,
      'aria-required': required,
      disabled,
      id,
      onChange,
      onFocus: this.onFocus,
      onBlur: this.onBlur,
      placeholder,
      type: type,
      value: value,
    };
  };

  render() {
    const {
      override: {
        InputContainer: InputContainerOverride,
        Input: InputOverride,
        Before: BeforeOverride,
        After: AfterOverride,
      },
    } = this.props;

    const sharedProps = getSharedProps(this.props, this.state);

    const InputContainer = getComponent(
      InputContainerOverride,
      StyledInputContainer,
    );
    const Input = getComponent(InputOverride, StyledInput);
    const Before = getComponent(BeforeOverride, null);
    const After = getComponent(AfterOverride, null);

    return (
      <InputContainer
        {...getComponentProps(InputContainerOverride)}
        {...sharedProps}
      >
        <span>
          <i />
        </span>
        {Before ? (
          <Before {...getComponentProps(BeforeOverride)} {...sharedProps} />
        ) : null}
        <Input
          {...getComponentProps(InputOverride)}
          {...this.getInputProps()}
          {...sharedProps}
        />
        {After ? (
          <After {...getComponentProps(AfterOverride)} {...sharedProps} />
        ) : null}
      </InputContainer>
    );
  }
}

export default BaseInput;

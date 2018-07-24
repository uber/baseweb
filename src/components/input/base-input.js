// @flow
import * as React from 'react';
import getBuiId from '../../utils/get-bui-id';
import {getComponent, getOverrideProps} from '../../helpers/overrides';
import type {BaseInputPropsT, InternalStateT} from './types';
import {getSharedProps} from './utils';
import {ADJOINED, SIZE} from './constants';
import {
  InputContainer as StyledInputContainer,
  Input as StyledInput,
} from './styled-components';

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
    overrides: {},
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
      overrides: {
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
        {...getOverrideProps(InputContainerOverride)}
        {...sharedProps}
      >
        <span>
          <i />
        </span>
        {Before ? (
          <Before {...getOverrideProps(BeforeOverride)} {...sharedProps} />
        ) : null}
        <Input
          {...getOverrideProps(InputOverride)}
          {...this.getInputProps()}
          {...sharedProps}
        />
        {After ? (
          <After {...getOverrideProps(AfterOverride)} {...sharedProps} />
        ) : null}
      </InputContainer>
    );
  }
}

export default BaseInput;

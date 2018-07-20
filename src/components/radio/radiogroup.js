// @flow
import React from 'react';
import type {PropsT, DefaultPropsT, StatelessStateT} from './types';
import {
  RadioGroupRoot as StyledRadioGroupRoot,
  RadioMark as StyledRadioMark,
  Label as StyledLabel,
  Input as StyledInput,
  Root as StyledRoot,
} from './styled-components';

class StatelessRadioGroup extends React.Component<PropsT, StatelessStateT> {
  static defaultProps: DefaultPropsT = {
    name: '',
    value: '',
    disabled: false,
    autoFocus: false,
    labelPlacement: 'right',
    align: 'vertical',
    isError: false,
    required: false,
    onChange: () => {},
    onMouseEnter: () => {},
    onMouseLeave: () => {},
    onFocus: () => {},
    onBlur: () => {},
  };

  render() {
    const {
      name,
      children,
      labelPlacement,
      isError,
      disabled,
      align,
      required,
      overrides = {},
    } = this.props;
    const events = {
      onChange: this.props.onChange,
      onMouseEnter: this.props.onMouseEnter,
      onMouseLeave: this.props.onMouseLeave,
      onFocus: this.props.onFocus,
      onBlur: this.props.onBlur,
    };
    const sharedProps = {
      $isError: isError,
      $required: required,
      $disabled: disabled,
    };
    const {
      Root = StyledRoot,
      RadioMark = StyledRadioMark,
      Label = StyledLabel,
      Input = StyledInput,
    } = overrides;
    const childrenProps = {
      name,
      isError,
      disabled,
      required,
      labelPlacement,
      type: 'radio',
      overrides: {Root, Checkmark: RadioMark, Label, Input},
      ...sharedProps,
      ...events,
    };
    return (
      <StyledRadioGroupRoot $align={align} {...sharedProps}>
        {React.Children.map(children, child => {
          if (!React.isValidElement(child)) {
            return null;
          }
          return React.cloneElement(child, {
            ...childrenProps,
            checked: this.props.value === child.props.value,
          });
        })}
      </StyledRadioGroupRoot>
    );
  }
}

export default StatelessRadioGroup;

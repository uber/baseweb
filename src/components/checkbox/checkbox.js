// @flow
import React from 'react';
import {getComponent, getOverrideProps} from '../../helpers/overrides';
import type {PropsT, DefaultPropsT, StatelessStateT} from './types';
import {
  Checkmark as StyledCheckmark,
  Input as StyledInput,
  Label as StyledLabel,
  Root as StyledRoot,
} from './styled-components';

class StatelessCheckbox extends React.Component<PropsT, StatelessStateT> {
  static defaultProps: DefaultPropsT = {
    overrides: {},
    checked: false,
    disabled: false,
    autoFocus: false,
    isIndeterminate: false,
    labelPlacement: 'right',
    inputRef: React.createRef(),
    isError: false,
    label: '',
    onChange: () => {},
    onMouseEnter: () => {},
    onMouseLeave: () => {},
    onFocus: () => {},
    onBlur: () => {},
  };

  state = {
    isFocused: this.props.autoFocus || false,
    isHovered: false,
  };

  componentDidMount() {
    const {autoFocus, inputRef} = this.props;
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }

  onMouseEnter = (e: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({isHovered: true});
    this.props.onMouseEnter(e);
  };

  onMouseLeave = (e: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({isHovered: false});
    this.props.onMouseLeave(e);
  };

  onFocus = (e: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({isFocused: true});
    this.props.onFocus(e);
  };

  onBlur = (e: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({isFocused: false});
    this.props.onBlur(e);
  };

  render() {
    const {
      overrides = {},
      onChange,
      labelPlacement,
      label,
      inputRef,
      isIndeterminate,
      isError,
      disabled,
      checked,
      required,
    } = this.props;

    const {
      Root: RootOverride,
      Checkmark: CheckmarkOverride,
      Label: LabelOverride,
      Input: InputOverride,
    } = overrides;

    const Root = getComponent(RootOverride, StyledRoot);
    const Checkmark = getComponent(CheckmarkOverride, StyledCheckmark);
    const Label = getComponent(LabelOverride, StyledLabel);
    const Input = getComponent(InputOverride, StyledInput);

    const events = {
      onChange,
      onMouseEnter: this.onMouseEnter,
      onMouseLeave: this.onMouseLeave,
      onFocus: this.onFocus,
      onBlur: this.onBlur,
    };
    const sharedProps = {
      $isFocused: this.state.isFocused,
      $isHovered: this.state.isHovered,
      $isError: isError,
      $checked: checked,
      $isIndeterminate: isIndeterminate,
      $required: required,
      $disabled: disabled,
    };
    const labelComp = (
      <Label
        $labelPlacement={labelPlacement}
        {...sharedProps}
        {...events}
        {...getOverrideProps(LabelOverride)}
      >
        {label}
      </Label>
    );
    return (
      <Root
        $labelPlacement={labelPlacement}
        {...sharedProps}
        {...getOverrideProps(RootOverride)}
      >
        {(labelPlacement === 'top' || labelPlacement === 'left') && labelComp}
        <Checkmark
          checked={checked}
          {...sharedProps}
          {...getOverrideProps(CheckmarkOverride)}
        />
        <Input
          required={required}
          aria-invalid={isError || null}
          aria-required={required || null}
          disabled={disabled}
          type="checkbox"
          $ref={inputRef}
          {...sharedProps}
          {...events}
          {...getOverrideProps(InputOverride)}
        />
        {(labelPlacement === 'bottom' || labelPlacement === 'right') &&
          labelComp}
      </Root>
    );
  }
}

export default StatelessCheckbox;

// @flow
import * as React from 'react';
import type {TextareaComponentsT, TextareaPropsT} from './types';
import {getComponent} from '../../helpers/overrides';
import getBuiId from '../../utils/get-bui-id';
import {BaseInput, SIZE, CUSTOM_INPUT_TYPE} from '../input';
import {Textarea as StyledTextarea} from './styled-components';

class Textarea extends React.Component<TextareaPropsT> {
  static defaultProps = {
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
    rows: 3,
    size: SIZE.default,
    value: '',
  };

  render() {
    const overrides: TextareaComponentsT = {
      ...this.props.overrides,
      Input: this.props.overrides
        ? this.props.overrides.Input &&
          typeof this.props.overrides.Input === 'object'
          ? // $FlowFixMe
            {
              ...this.props.overrides.Input,
              component: getComponent(
                this.props.overrides.Input,
                StyledTextarea,
              ),
            }
          : this.props.overrides.Input || StyledTextarea
        : StyledTextarea,
    };
    return (
      <BaseInput
        {...this.props}
        type={CUSTOM_INPUT_TYPE.textarea}
        // $FlowFixMe
        overrides={overrides}
      />
    );
  }
}

export default Textarea;

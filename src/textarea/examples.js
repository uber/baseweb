/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {withStyle} from 'styletron-react';
import {styled} from '../styles';
import {withProps} from '../helpers';
import {
  StatefulTextarea as Textarea,
  Textarea as ControlledTextarea,
  StyledTextarea,
  SIZE,
} from './index';
import examples from './examples-list';

const Button = styled('button', ({$theme}) => {
  return {
    ...$theme.typography.font300,
    display: 'block',
    paddingTop: '10px',
    paddingRight: '12px',
    paddingBottom: '10px',
    paddingLeft: '12px',
    marginTop: '8px',
    width: '100%',
    borderRadius: $theme.sizing.scale100,
    borderWidth: 'none',
  };
});

const TextareaWithStyle = withStyle(StyledTextarea, props => {
  const {
    $disabled,
    $error,
    $isFocused,
    $theme: {colors, sizing},
  } = props;
  return {
    borderColor: $disabled
      ? colors.borderAlt
      : $error
        ? colors.borderError
        : $isFocused
          ? 'darkseagreen'
          : colors.border,
    boxShadow: `0 0 ${sizing.scale100} ${
      $disabled
        ? 'transparent'
        : $error
          ? colors.shadowError
          : $isFocused
            ? 'lightseagreen'
            : 'transparent'
    }`,
  };
});

const TextareaWithProps = withProps(StyledTextarea, {
  'data-test': 'test',
});

export default {
  [examples.SIMPLE_EXAMPLE]: function Story1() {
    return (
      <React.Fragment>
        <ControlledTextarea placeholder="Controlled textarea" />
        <br />
        <Textarea
          placeholder="Uncontrolled textarea"
          initialState={{value: 'initial value'}}
        />
      </React.Fragment>
    );
  },
  [examples.SIZE_EXAMPLE]: function Story2() {
    return (
      <React.Fragment>
        <Textarea placeholder="Default textarea" />
        <br />
        <Textarea size={SIZE.compact} placeholder="Compact textarea" />
      </React.Fragment>
    );
  },
  [examples.STATE_EXAMPLE]: function Story3() {
    return (
      <React.Fragment>
        <Textarea size={SIZE.compact} placeholder="Placeholder" />
        <br />
        {/* eslint-disable-next-line jsx-a11y/no-autofocus */}
        <Textarea size={SIZE.compact} placeholder="Focused" autoFocus />
        <br />
        <Textarea
          initialState={{value: 'uber'}}
          size={SIZE.compact}
          placeholder="Placeholder"
        />
        <br />
        <Textarea size={SIZE.compact} error={true} placeholder="Placeholder" />
        <br />
        <Textarea
          size={SIZE.compact}
          disabled
          placeholder="Disabled textarea"
        />
      </React.Fragment>
    );
  },
  [examples.OVERRIDES_EXAMPLE]: function Story4() {
    return (
      <React.Fragment>
        <Textarea
          overrides={{Input: TextareaWithStyle}}
          placeholder="With style overrides on the textarea element"
        />
        <br />
        <Textarea
          label="Input with extra props"
          overrides={{
            Input: TextareaWithProps,
          }}
          placeholder="With a 'data-test' attrs passes to the input element"
        />
      </React.Fragment>
    );
  },
  [examples.REF_EXAMPLE]: function Story5() {
    const inputRef = (React.createRef(): {current: ?HTMLInputElement});
    return (
      <React.Fragment>
        <Textarea inputRef={inputRef} placeholder="With textarea input ref" />
        <Button
          onClick={() => {
            inputRef.current && inputRef.current.focus();
          }}
        >
          Click here to focus input
        </Button>
      </React.Fragment>
    );
  },
};

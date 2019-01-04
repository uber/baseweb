/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow
import * as React from 'react';
import {withStyle} from 'styletron-react';

import {styled} from '../styles/index.js';
import {
  Input as ControlledInput,
  MaskedInput,
  StatefulInput as Input,
  StyledInput,
  StyledInputContainer,
  SIZE,
} from './index.js';
import {Tag} from '../tag/index.js';
import {Button} from '../button/index.js';
import {DeleteAlt} from '../icon/index.js';

import examples from './examples-list.js';

const InputIcon = styled('span', props => {
  return {
    width: '16px',
    display: 'flex',
    alignItems: 'center',
    padding:
      props.$position === 'left'
        ? '0 0 0 12px'
        : props.$position === 'right'
          ? '0 12px 0 0'
          : '0',
    ':before': {
      content: '""',
      display: 'inline-block',
      boxSizing: 'border-box',
      verticalAlign: 'middle',
      width: '16px',
      height: '16px',
      borderRadius: '50%',
      backgroundColor: props.$isFocused
        ? props.$theme.colors.primary
        : '#999999',
    },
  };
});

const RootWithStyle = withStyle(StyledInputContainer, props => {
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

const TextHighlight = styled('span', ({$theme}) => {
  return {color: $theme.colors.primary};
});

const ValueWrapper = styled('div', {
  flex: '1 1 0%',
  flexWrap: 'wrap',
  display: 'flex',
});

const InputReplacement = props => {
  return (
    <ValueWrapper style={{alignItems: 'center'}}>
      {[
        'tag 1 to search',
        'tag 2 to search',
        'tag 3 to search',
        'tag 4 to search',
        'tag 5 to search',
      ].map((text, index) => (
        <Tag key={index}>{text}</Tag>
      ))}
      <StyledInput {...props} />
    </ValueWrapper>
  );
};

export default {
  [examples.SIMPLE_EXAMPLE]: function simpleExample() {
    return (
      <React.Fragment>
        <ControlledInput placeholder="Controlled input" />
        <br />
        <Input placeholder="Uncontrolled (stateful) input" />
      </React.Fragment>
    );
  },

  [examples.SIZE_EXAMPLE]: function sizeExample() {
    return (
      <React.Fragment>
        <Input placeholder="Default input" />
        <br />
        <Input size={SIZE.compact} placeholder="Compact input" />
      </React.Fragment>
    );
  },

  [examples.STATE_EXAMPLE]: function stateExample() {
    return (
      <React.Fragment>
        <Input size={SIZE.compact} placeholder="Default input" />
        <br />
        <Input
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus={true}
          initialState={{value: 'uber'}}
          startEnhancer="@"
          endEnhancer=".com"
          size={SIZE.compact}
          placeholder="Initially focused input"
          overrides={{Input: {props: {'data-test': 'e2e'}}}}
        />
        <br />
        <Input
          size={SIZE.compact}
          error
          placeholder="Input in an error state"
        />
        <br />
        <Input
          startEnhancer="@"
          endEnhancer=".com"
          size={SIZE.compact}
          error
          placeholder="Input with enhancers in an error state"
        />
        <br />
        <Input size={SIZE.compact} disabled placeholder="Disabled input" />
        <br />
        <Input
          startEnhancer="@"
          endEnhancer=".com"
          size={SIZE.compact}
          disabled
          placeholder="Disabled input with enhancers"
        />
      </React.Fragment>
    );
  },

  [examples.ENHANCERS_EXAMPLE]: function enhancersExample() {
    return (
      <React.Fragment>
        <Input startEnhancer="@" placeholder="Input with a startEnhancer" />
        <br />
        <Input endEnhancer=".00" placeholder="Input with an endEnhancer" />
        <br />
        <Input
          startEnhancer="@"
          endEnhancer=".00"
          placeholder="Input with start and end enhancers"
        />
        <br />
        <Input
          startEnhancer={<InputIcon />}
          endEnhancer={<InputIcon />}
          placeholder="Input with element type enhancers"
        />
        <br />
        <Input
          startEnhancer={({$isFocused}) => {
            return $isFocused ? <TextHighlight>@</TextHighlight> : '@';
          }}
          endEnhancer={({$isFocused}) => {
            return $isFocused ? <TextHighlight>.00</TextHighlight> : '.00';
          }}
          placeholder="Input with function type enhancers. Shared props are passed into an enhancer func"
        />
      </React.Fragment>
    );
  },

  [examples.BEFORE_AFTER_EXAMPLE]: function beforeAfterExample() {
    return (
      <React.Fragment>
        <Input
          overrides={{
            Before: function Before(props) {
              return <InputIcon {...props} $position="left" />;
            },
          }}
          placeholder="Input with a Before component"
        />
        <br />
        <Input
          overrides={{
            After: function After(props) {
              return <InputIcon {...props} $position="right" />;
            },
          }}
          placeholder="Input with an After component"
        />
      </React.Fragment>
    );
  },

  [examples.VALUE_EXAMPLE]: function valueExample() {
    return (
      <Input
        placeholder="Input with search tags"
        overrides={{
          Input: {
            style: {width: 'auto'},
            component: InputReplacement,
          },
          After: function After(props) {
            return (
              <DeleteAlt
                size={24}
                color="#999"
                overrides={{
                  Svg: {style: {cursor: 'pointer', alignSelf: 'center'}},
                }}
              />
            );
          },
        }}
      />
    );
  },

  [examples.MASK_EXAMPLE]: function maskExample() {
    return (
      <React.Fragment>
        <MaskedInput placeholder="Phone number" mask="(999) 999-9999" />
      </React.Fragment>
    );
  },

  [examples.OVERRIDES_EXAMPLE]: function overrideExample() {
    return (
      <React.Fragment>
        <Input
          overrides={{InputContainer: {component: RootWithStyle}}}
          placeholder="Input with a custom InputContainer override"
        />
        <br />
        <Input
          overrides={{
            Input: {
              props: {'data-test': 'test'},
              style: ({$theme: {colors}}) => ({color: colors.primary}),
            },
          }}
          initialState={{
            value:
              "With a 'data-test' attrs passes to the input and text style override",
          }}
          placeholder="With a 'data-test' attrs passes to the input and text style override"
        />
      </React.Fragment>
    );
  },

  [examples.REF_EXAMPLE]: function refExample() {
    const inputRef = (React.createRef(): {current: ?HTMLInputElement});
    return (
      <React.Fragment>
        <Input inputRef={inputRef} placeholder="With input ref" />
        <Button
          onClick={() => {
            inputRef.current && inputRef.current.focus();
          }}
          overrides={{BaseButton: {style: {width: '100%', marginTop: '12px'}}}}
        >
          Click here to focus input
        </Button>
      </React.Fragment>
    );
  },
};

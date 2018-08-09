/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
/*global module */
import * as React from 'react';
import {storiesOf} from '@storybook/react';
import {withStyle} from 'styletron-react';
import {styled} from '../styles';
import {withReadme} from 'storybook-readme';
//$FlowFixMe
import InputReadme from '../../rfcs/input-component.md';
import {
  Input as ControlledInput,
  StatefulInput as Input,
  StyledInput,
  StyledInputContainer,
  SIZE,
} from './index';

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

storiesOf('Input', module)
  .addDecorator(withReadme(InputReadme))
  // .add('Passing dynamic props', () => {
  //   return <MyComponent />;
  // })
  .add('Controlled and uncontrolled input', () => {
    return (
      <React.Fragment>
        <ControlledInput placeholder="Controlled input" />
        <br />
        <Input placeholder="Uncontrolled (stateful) input" />
      </React.Fragment>
    );
  })
  .add('Input size', () => {
    return (
      <React.Fragment>
        <Input placeholder="Default input" />
        <br />
        <Input size={SIZE.compact} placeholder="Compact input" />
      </React.Fragment>
    );
  })
  .add('Input state', () => {
    return (
      <React.Fragment>
        <Input size={SIZE.compact} placeholder="Default input" />
        <br />
        <Input
          initialState={{value: 'uber'}}
          autoFocus
          startEnhancer="@"
          endEnhancer=".com"
          size={SIZE.compact}
          placeholder="Initially focused input"
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
  })
  .add('Input enhancers', () => {
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
  })
  .add('Input with Search tags', () => {
    return (
      <React.Fragment>
        <Input
          label="Input with search tags"
          overrides={{
            Input: withStyle(StyledInput, props => {
              return {width: 'auto'};
            }),
            InputContainer: withStyle(StyledInputContainer, props => {
              return {
                flexWrap: 'wrap',
                padding: '5px',
                alignItems: 'center',
                position: 'relative',
                backgroundColor: 'white',
                borderColor: '#276EF1',
              };
            }),
            After: function After(props) {
              const Img = styled('img', props => {
                return {
                  marginLeft: 'auto',
                  position: 'absolute',
                  right: '10px',
                };
              });
              return (
                <Img
                  src={
                    'data:image/svg+xml;utf8,<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58173 12.4183 0 8 0C3.58173 0 0 3.58173 0 8C0 12.4183 3.58173 16 8 16ZM6.03033 4.96967C5.73743 4.67679 5.26257 4.67679 4.96967 4.96967C4.67676 5.26257 4.67676 5.73743 4.96967 6.03033L6.93933 8L4.96967 9.96967C4.67676 10.2626 4.67676 10.7374 4.96967 11.0303C5.26257 11.3232 5.73743 11.3232 6.03033 11.0303L8 9.06067L9.96967 11.0303C10.2626 11.3232 10.7374 11.3232 11.0303 11.0303C11.3232 10.7374 11.3232 10.2626 11.0303 9.96967L9.06067 8L11.0303 6.03033C11.3232 5.73743 11.3232 5.26257 11.0303 4.96967C10.7374 4.67679 10.2626 4.67679 9.96967 4.96967L8 6.93933L6.03033 4.96967Z" fill="#999999"/></svg>'
                  }
                />
              );
            },
            Before: function Before(props) {
              const Icon = styled('span', props => {
                return {
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '5px',
                  margin: '5px',
                  borderWidth: '1px',
                  borderColor: '#276EF1',
                  color: '#276EF1',
                  borderRadius: '7px',
                  lineHeight: '24px',
                  backgroundColor: '#EDF3FE',
                };
              });
              const Img = styled('img', props => {
                return {};
              });
              return (
                <React.Fragment>
                  <Img
                    src={
                      'data:image/svg+xml;utf8,<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 9L13 13M10 5C10 7.76142 7.76142 10 5 10C2.23858 10 0 7.76142 0 5C0 2.23858 2.23858 0 5 0C7.76142 0 10 2.23858 10 5Z" transform="translate(1 1)" stroke="#1B6DE0" stroke-width="2" stroke-linecap="round"/></svg>'
                    }
                  />
                  {[
                    'tag 1 to search',
                    'tag 2 to search',
                    'tag 3 to search',
                    'tag 4 to search',
                    'tag 5 to search',
                    'tag 6 to search',
                    'tag 7 to search',
                    'tag 8 to search',
                  ].map(text => (
                    <Icon key={text}>
                      {text}
                      <Img
                        src={
                          'data:image/svg+xml;utf8,<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M0.195262 0.195262C0.455612 -0.0650874 0.877722 -0.0650874 1.13807 0.195262L3.33333 2.39052L5.5286 0.195262C5.78895 -0.0650874 6.21106 -0.0650874 6.4714 0.195262C6.73175 0.455612 6.73175 0.877722 6.4714 1.13807L4.27614 3.33333L6.4714 5.5286C6.73175 5.78895 6.73175 6.21106 6.4714 6.4714C6.21106 6.73175 5.78895 6.73175 5.5286 6.4714L3.33333 4.27614L1.13807 6.4714C0.877722 6.73175 0.455612 6.73175 0.195262 6.4714C-0.0650874 6.21106 -0.0650874 5.78895 0.195262 5.5286L2.39052 3.33333L0.195262 1.13807C-0.0650874 0.877722 -0.0650874 0.455612 0.195262 0.195262Z" transform="translate(4.66675 4.6665)" fill="#276EF1"/></svg>'
                        }
                      />
                    </Icon>
                  ))}
                </React.Fragment>
              );
            },
          }}
          placeholder="Start searching"
        />
      </React.Fragment>
    );
  })
  .add('Input with Before and After', () => {
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
  })
  .add(
    'Input with a with custom component override, style overrides and extra props passed',
    () => {
      return (
        <React.Fragment>
          <Input
            overrides={{InputContainer: {component: RootWithStyle}}}
            autoFocus
            placeholder="Input with a custom InputContainer override"
          />
          <br />
          <Input
            overrides={{
              Input: {
                props: {'data-test': 'test'},
                style: {color: '#00F'},
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
  )
  .add('Input with a ref', () => {
    const inputRef: {current: ?React.ElementRef<'input'>} = React.createRef();
    return (
      <React.Fragment>
        <Input inputRef={inputRef} placeholder="With input ref" />
        <Button
          onClick={() => {
            inputRef.current && inputRef.current.focus();
          }}
        >
          Click here to focus input
        </Button>
      </React.Fragment>
    );
  });

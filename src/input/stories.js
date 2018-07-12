// @flow
/*global module */
import * as React from 'react';
import {storiesOf} from '@storybook/react';
import {withStyle} from 'styletron-react';
import {styled} from '../styles';
import {withProps} from '../helpers';
import {
  Input as ControlledInput,
  StatefulInput as Input,
  StyledInputContainer,
  StyledInput,
  StyledLabel,
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
        : props.$position === 'right' ? '0 12px 0 0' : '0',
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
  const {$disabled, $error, $isFocused, $theme: {colors, sizing}} = props;
  return {
    borderColor: $disabled
      ? colors.borderAlt
      : $error
        ? colors.borderError
        : $isFocused ? 'darkseagreen' : colors.border,
    boxShadow: `0 0 ${sizing.scale100} ${
      $disabled
        ? 'transparent'
        : $error
          ? colors.shadowError
          : $isFocused ? 'lightseagreen' : 'transparent'
    }`,
  };
});

const InputWithProps = withProps(StyledInput, {
  'data-test': 'test',
});

const LabelWithProps = withProps(StyledLabel, {
  'data-test-label': 'test',
});

const LabelWithStyle = withStyle(StyledLabel, ({$isFocused, $theme}) => {
  return {
    display: 'flex',
    color: $isFocused ? $theme.colors.primary : $theme.colors.mono1000,
  };
});
const CustomLabel = ({children, ...rest}: {children: React.Node}) => {
  return (
    <LabelWithStyle {...rest} data-label="data-label">
      {children}
      <InputIcon $position="left" {...rest} />
    </LabelWithStyle>
  );
};

const TextHighlight = styled('span', ({$theme}) => {
  return {color: $theme.colors.primary};
});

storiesOf('Input', module)
  // .add('Passing dynamic props', () => {
  //   return <MyComponent />;
  // })
  .add('Controlled and uncontrolled input', () => {
    return (
      <React.Fragment>
        <ControlledInput
          label="Controlled input"
          caption="Caption"
          placeholder="Placeholder"
        />
        <Input
          label="Uncontrolled (stateful) input"
          caption="Caption"
          placeholder="Placeholder"
        />
      </React.Fragment>
    );
  })
  .add('Input size', () => {
    return (
      <React.Fragment>
        <Input
          label="Default input"
          caption="Caption"
          placeholder="Placeholder"
        />
        <Input
          label="Compact input"
          caption="Caption"
          size={SIZE.compact}
          placeholder="Placeholder"
        />
      </React.Fragment>
    );
  })
  .add('Input state', () => {
    return (
      <React.Fragment>
        <Input
          label="Default input"
          caption="Caption"
          size={SIZE.compact}
          placeholder="Placeholder"
        />
        <Input
          label="Initially focused input"
          initialState={{value: 'uber'}}
          caption="Caption"
          autoFocus
          startEnhancer="@"
          endEnhancer=".com"
          size={SIZE.compact}
          placeholder="Placeholder"
        />
        <Input
          label="Input in an error state"
          caption="Caption"
          size={SIZE.compact}
          error="Error in place of caption when $error is a node"
          placeholder="Placeholder"
        />
        <Input
          label="Input with enhancers in an error state"
          caption="Caption rendered when $error is a boolean"
          startEnhancer="@"
          endEnhancer=".com"
          size={SIZE.compact}
          error
          placeholder="Placeholder"
        />
        <Input
          label="Disabled input"
          caption="Caption"
          size={SIZE.compact}
          disabled
          placeholder="Placeholder"
        />
        <Input
          label="Disabled input with enhancers"
          caption="Caption"
          startEnhancer="@"
          endEnhancer=".com"
          size={SIZE.compact}
          disabled
          placeholder="Placeholder"
        />
      </React.Fragment>
    );
  })
  .add('Input label and caption', () => {
    const Span = styled('span', {
      display: 'flex',
      alignItems: 'center',
    });
    const Icon = styled('span', ({$position, $error, $theme}) => {
      return {
        padding: $position === 'left' ? '0 8px 0 0' : '0 0 0 8px',
        ':before': {
          content: '""',
          display: 'flex',
          boxSizing: 'border-box',
          verticalAlign: 'middle',
          width: '16px',
          height: '16px',
          borderRadius: '50%',
          backgroundColor: $error ? $theme.colors.negative400 : '#999999',
        },
      };
    });
    return (
      <React.Fragment>
        <Input
          label="String type label"
          caption="String type caption"
          size={SIZE.compact}
          placeholder="Placeholder"
        />
        <Input
          label={
            <Span>
              Element type label<Icon $position="right" />
            </Span>
          }
          caption={
            <Span>
              <Icon $position="left" />Element type caption
            </Span>
          }
          size={SIZE.compact}
          placeholder="Placeholder"
        />
        <Input
          // $FlowFixMe
          label={props => {
            const {$isFocused} = props;
            return $isFocused
              ? 'Function type label gets shared props'
              : 'Function type label';
          }}
          // $FlowFixMe
          caption={props => {
            const {$isFocused} = props;
            return $isFocused
              ? 'Function type caption gets shared props'
              : 'Function type caption';
          }}
          size={SIZE.compact}
          placeholder="Placeholder"
        />
        <Input
          label="Label"
          caption="Caption"
          error="String type error caption"
          size={SIZE.compact}
          placeholder="Placeholder"
        />
        <Input
          label="Label"
          caption="Caption"
          error={
            <Span>
              <Icon $position="left" $error />Element type error caption
            </Span>
          }
          size={SIZE.compact}
          placeholder="Placeholder"
        />
        <Input
          label="Label"
          caption="Caption"
          // $FlowFixMe
          error={props => {
            const {$isFocused} = props;
            return $isFocused ? (
              <TextHighlight>Change error when focused</TextHighlight>
            ) : (
              'Function type error gets shared props'
            );
          }}
          size={SIZE.compact}
          placeholder="Placeholder"
        />
      </React.Fragment>
    );
  })
  .add('Input enhancers', () => {
    return (
      <React.Fragment>
        <Input
          label="Input with a startEnhancer"
          caption="Caption"
          startEnhancer="@"
          placeholder="Start enhancer"
        />
        <Input
          label="Input with an endEnhancer"
          caption="Caption"
          endEnhancer=".00"
          placeholder="End enhancer"
        />
        <Input
          label="Input with start and end enhancers"
          caption="Caption"
          startEnhancer="@"
          endEnhancer=".00"
          placeholder="Placeholder"
        />
        <Input
          label="Input with element type enhancers"
          caption="Caption"
          startEnhancer={<InputIcon />}
          endEnhancer={<InputIcon />}
          placeholder="Placeholder"
        />
        <Input
          label="Input with function type enhancers"
          caption="Shared props are passed into an enhancer func"
          // $FlowFixMe
          startEnhancer={({$isFocused}) => {
            return $isFocused ? <TextHighlight>@</TextHighlight> : '@';
          }}
          // $FlowFixMe
          endEnhancer={({$isFocused}) => {
            return $isFocused ? <TextHighlight>.00</TextHighlight> : '.00';
          }}
          placeholder="Placeholder"
        />
      </React.Fragment>
    );
  })
  .add('Input with Before and After', () => {
    return (
      <React.Fragment>
        <Input
          label="Input with a Before component"
          override={{
            Before: function Before(props) {
              return <InputIcon {...props} $position="left" />;
            },
          }}
          placeholder="With a Before element"
        />
        <Input
          label="Input with an After component"
          override={{
            After: function After(props) {
              return <InputIcon {...props} $position="right" />;
            },
          }}
          placeholder="With an After element"
        />
      </React.Fragment>
    );
  })
  .add('Input with style overrides and extra props passed', () => {
    return (
      <React.Fragment>
        <Input
          label="Input with style overrides"
          override={{InputContainer: RootWithStyle}}
          placeholder="With style overrides on the Root element"
        />
        <Input
          label="Input with extra props"
          override={{
            Input: InputWithProps,
            Label: LabelWithProps,
          }}
          placeholder="With a 'data-test' attrs passes to the input and label elements"
        />
      </React.Fragment>
    );
  })
  .add('Input with custom components', () => {
    return (
      <React.Fragment>
        <Input
          label="Input with custom label"
          override={{
            Label: CustomLabel,
          }}
          placeholder="Placeholder"
        />
      </React.Fragment>
    );
  })
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

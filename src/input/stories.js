import React from 'react';
import {storiesOf} from '@storybook/react';
import {withStyle} from 'styletron-react';
import {styled} from '../styles';
import {StatefulInput as Input, StyledInputContainer} from './index';
import {withProps} from '../helpers';

const onChange = e => {
  // eslint-disable-next-line no-console
  console.log('New Value:', e.target.value);
};

const Button = styled('button', ({$theme}) => {
  return {
    ...$theme.typography.font400,
    display: 'block',
    paddingTop: '10px',
    paddingRight: '12px',
    paddingBottom: '10px',
    paddingLeft: '12px',
    marginTop: '8px',
    width: '100%',
    borderRadius: $theme.sizing.scale100,
  };
});

const Icon = styled('span', props => {
  return {
    width: '16px',
    display: 'flex',
    alignItems: 'center',
    padding: props.$position === 'left' ? '0 0 0 12px' : '0 12px 0 0',
    ':before': {
      content: '""',
      display: 'inline-block',
      boxSizing: 'border-box',
      verticalAlign: 'middle',
      width: '16px',
      height: '16px',
      borderRadius: '50%',
      backgroundColor: props.$isFocused ? '#4E77B0' : '#999999',
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

const RootWithProps = withProps(StyledInputContainer, {
  'data-value': 'hidden value',
});

storiesOf('Input', module)
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
          $size="compact"
          placeholder="Placeholder"
        />
      </React.Fragment>
    );
  })
  .add('Input state', () => {
    return (
      <React.Fragment>
        <Input
          label="Dafault input"
          caption="Caption"
          $size="compact"
          placeholder="Placeholder"
        />
        <Input
          label="Initially focused input"
          caption="Caption"
          initialState={{$isFocused: true}}
          startEnhancer="@"
          endEnhancer=".00"
          $size="compact"
          placeholder="Placeholder"
        />
        <Input
          label="Input in an error state"
          caption="Error caption"
          $size="compact"
          $error
          placeholder="Placeholder"
        />
        <Input
          label="Input with enhancers in an error state"
          caption="Error caption"
          startEnhancer="@"
          endEnhancer=".00"
          $size="compact"
          $error
          placeholder="Placeholder"
        />
        <Input
          label="Disabled input"
          caption="Caption"
          $size="compact"
          disabled
          placeholder="Placeholder"
        />
        <Input
          label="Disabled input with enhancers"
          caption="Caption"
          startEnhancer="@"
          endEnhancer=".00"
          $size="compact"
          disabled
          placeholder="Placeholder"
        />
      </React.Fragment>
    );
  })
  .add('Input label and caption', () => {
    return (
      <React.Fragment>
        <Input
          label="String type label"
          caption="String type caption"
          $size="compact"
          placeholder="Placeholder"
        />
        <Input
          label={<span>Node type label</span>}
          caption={<span>Node type caption</span>}
          $size="compact"
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
      </React.Fragment>
    );
  })
  .add('Input adjoined both', () => {
    return (
      <Input
        onChange={onChange}
        $adjoined="both"
        placeholder="To be grouped in the middle"
      />
    );
  })
  .add('Input with Before and After', () => {
    return (
      <React.Fragment>
        <Input
          label="Input with a Before component"
          onChange={onChange}
          components={{Before: props => <Icon {...props} $position="left" />}}
          placeholder="With a Before element"
        />
        <Input
          label="Input with an After component"
          onChange={onChange}
          components={{After: props => <Icon {...props} $position="right" />}}
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
          onChange={onChange}
          components={{InputContainer: RootWithStyle}}
          placeholder="With style overrides on the Root element"
        />
        <Input
          label="Input with extra props"
          onChange={onChange}
          components={{
            InputContainer: RootWithProps,
          }}
          placeholder="With a custom 'data-value' attr on the Root"
        />
      </React.Fragment>
    );
  })
  .add('Input with a ref', () => {
    const inputRef = React.createRef();
    return (
      <React.Fragment>
        <Input
          onChange={onChange}
          $inputRef={inputRef}
          placeholder="With input ref"
        />
        <Button
          onClick={() => {
            inputRef.current.focus();
          }}
        >
          Click here to focus input
        </Button>
      </React.Fragment>
    );
  });

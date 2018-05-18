import React from 'react';
import {storiesOf} from '@storybook/react';
import {styled, withStyle} from 'styletron-react';
import {Input, StyledRoot} from './index';
import {withProps} from '../helpers';

const onChange = e => {
  // eslint-disable-next-line no-console
  console.log('New Value:', e.target.value);
};

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

const RootWithStyle = withStyle(StyledRoot, props => {
  const {$disabled, $error, $isFocused, theme: {colors}} = props;
  return {
    border: `1px solid ${
      $disabled
        ? colors.borderAlt
        : $error ? colors.borderError : $isFocused ? 'lightpink' : colors.border
    }`,
  };
});

const RootWithProps = withProps(StyledRoot, {'data-value': 'secret value'});

storiesOf('Input', module)
  .add('Input example', () => {
    return <Input onChange={onChange} placeholder="Uncontrolled input" />;
  })
  .add('Input initially focused', () => {
    return (
      <Input
        initialState={{$isFocused: true}}
        onChange={onChange}
        placeholder="Uncontrolled initially focused input"
      />
    );
  })
  .add('Input with an error', () => {
    return (
      <Input onChange={onChange} $error placeholder="Input with an error " />
    );
  })
  .add('Input disabled', () => {
    return <Input onChange={onChange} disabled placeholder="Disabled" />;
  })
  .add('Input compact', () => {
    return (
      <Input onChange={onChange} $size="compact" placeholder="Compact input" />
    );
  })
  .add('Input adjoined left', () => {
    return (
      <Input
        onChange={onChange}
        $adjoined="left"
        placeholder="To be grouped on the left"
      />
    );
  })
  .add('Input adjoined right', () => {
    return (
      <Input
        onChange={onChange}
        $adjoined="right"
        placeholder="To be grouped on the right"
      />
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
  .add('Input with before', () => {
    return (
      <Input
        onChange={onChange}
        components={{Before: props => <Icon {...props} $position="left" />}}
        placeholder="With a Before element"
      />
    );
  })
  .add('Input with after', () => {
    return (
      <Input
        onChange={onChange}
        components={{After: props => <Icon {...props} $position="right" />}}
        placeholder="With an After element"
      />
    );
  })
  .add('Input with style overrides', () => {
    return (
      <Input
        onChange={onChange}
        components={{Root: RootWithStyle}}
        placeholder="With style overrides on the Root element"
      />
    );
  })
  .add('Input with extra props', () => {
    return (
      <Input
        onChange={onChange}
        components={{
          Root: RootWithProps,
        }}
        placeholder="With a custom 'data-value' attr on the Root"
      />
    );
  })
  .add('Input with a ref', () => {
    const inputRef = React.createRef();
    return (
      <Input
        onChange={onChange}
        $inputRef={inputRef}
        components={{
          After: props => (
            <Icon
              {...props}
              $position="right"
              onClick={() => {
                inputRef.current.focus();
              }}
            />
          ),
        }}
        placeholder="With input ref"
      />
    );
  });

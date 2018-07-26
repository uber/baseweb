// @flow
/*global module */
import * as React from 'react';
import {storiesOf} from '@storybook/react';
import {withReadme} from 'storybook-readme';
import {withStyle} from 'styletron-react';
import {styled} from '../../styles';
import {withProps} from '../../helpers';
import {
  StatefulTextarea as Textarea,
  Textarea as ControlledTextarea,
  StyledTextarea,
  StyledTextareaContainer,
  SIZE,
} from './index';

//$FlowFixMe
import TextareaReadme from '../../../rfcs/textarea-component.md';

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

const RootWithStyle = withStyle(StyledTextareaContainer, props => {
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

const TextareaWithProps = withProps(StyledTextarea, {
  'data-test': 'test',
});

storiesOf('Textarea', module)
  .addDecorator(withReadme(TextareaReadme))
  .add('Controlled and uncontrolled textarea', () => {
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
  })
  .add('Textarea size', () => {
    return (
      <React.Fragment>
        <Textarea placeholder="Default textarea" />
        <br />
        <Textarea size={SIZE.compact} placeholder="Compact textarea" />
      </React.Fragment>
    );
  })
  .add('Textarea state', () => {
    return (
      <React.Fragment>
        <Textarea size={SIZE.compact} placeholder="Placeholder" />
        <br />
        <Textarea
          initialState={{value: 'uber'}}
          autoFocus
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
  })
  .add('Textarea with style overrides and extra props passed', () => {
    return (
      <React.Fragment>
        <Textarea
          override={{InputContainer: RootWithStyle}}
          placeholder="With style overrides on the Root element"
        />
        <br />
        <Textarea
          label="Input with extra props"
          override={{
            Input: TextareaWithProps,
          }}
          placeholder="With a 'data-test' attrs passes to the input element"
        />
      </React.Fragment>
    );
  })
  .add('Textarea with a ref', () => {
    const inputRef: {current: ?React.ElementRef<'input'>} = React.createRef();
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
  });

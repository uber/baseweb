// @flow
import * as React from 'react';
import {FormControl} from 'baseui/form-control';
import {Input} from 'baseui/input';
import {useStyletron} from 'baseui';
import {Alert} from 'baseui/icon';
import {Button} from 'baseui/button';
import {validate as validateEmail} from 'email-validator'; // add this package to your repo with `$ yarn add email-validator`

function Negative() {
  const [css, theme] = useStyletron();
  return (
    <div
      className={css({
        display: 'flex',
        alignItems: 'center',
        paddingRight: theme.sizing.scale500,
        color: theme.colors.negative400,
      })}
    >
      <Alert size="18px" />
    </div>
  );
}

export default () => {
  const [value, setValue] = React.useState('');
  const [isValid, setIsValid] = React.useState(false);
  const [isVisited, setIsVisited] = React.useState(false);
  const shouldShowError = !isValid && isVisited;
  const onChange = ({target: {value}}) => {
    setIsValid(validateEmail(value));
    setValue(value);
  };

  return (
    <form onSubmit={e => e.preventDefault()}>
      <FormControl
        label="Your email"
        error={
          shouldShowError
            ? 'Please input a valid email address'
            : null
        }
      >
        <Input
          id="input-id"
          value={value}
          onChange={onChange}
          onBlur={() => setIsVisited(true)}
          error={shouldShowError}
          overrides={shouldShowError ? {After: Negative} : {}}
          type="email"
          required
        />
      </FormControl>
      <Button type="submit">Submit email</Button>
    </form>
  );
};

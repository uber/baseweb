import * as React from 'react';
import {FormControl} from 'baseui/form-control';
import {Input} from 'baseui/input';
import {useStyletron} from 'baseui';
import {Alert} from 'baseui/icon';
import {validate as validateEmail} from 'email-validator'; // add this package to your repo: `$ yarn add email-validator`

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
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {value} = event.currentTarget;
    setIsValid(validateEmail(value));
    setValue(value);
  };

  return (
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
      />
    </FormControl>
  );
};

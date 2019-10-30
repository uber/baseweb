// @flow
import * as React from 'react';
import {FormControl} from 'baseui/form-control';
import {Input, validateEmail} from 'baseui/input';
import {useStyletron} from 'baseui';
import Alert from 'baseui/icon/alert';

function Negative() {
  const [useCss, theme] = useStyletron();
  return (
    <div
      className={useCss({
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

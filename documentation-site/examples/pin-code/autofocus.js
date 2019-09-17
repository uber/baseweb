// @flow
import React from 'react';
import {useStyletron} from 'baseui';
import {Button} from 'baseui/button';
import {PinCode} from 'baseui/pin-code';

export default function() {
  const [css, theme] = useStyletron();
  const [showPinCode, toggle] = React.useState(false);
  const [values, setValues] = React.useState(['', '', '', '']);
  return (
    <div className={css({display: 'flex'})}>
      <Button onClick={() => toggle(s => !s)}>Mount PinCode</Button>
      <div className={css({marginLeft: theme.sizing.scale300})} />
      {showPinCode ? (
        <PinCode
          values={values}
          onChange={({values}) => {
            setValues(values);
          }}
          autoFocus
        />
      ) : null}
    </div>
  );
}

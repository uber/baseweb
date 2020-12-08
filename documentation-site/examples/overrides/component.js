// @flow
import * as React from 'react';
import {Button} from 'baseui/button';

function customButton(props) {
  return <button>{props.children}</button>;
}

export default function Example() {
  return (
    <Button
      overrides={{
        BaseButton: customButton,
      }}
    >
      Submit
    </Button>
  );
}

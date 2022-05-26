// @flow
import * as React from 'react';
import {Textarea} from 'baseui/textarea';

export default function Example() {
  const [valueA, setValueA] = React.useState('Positive state...');
  const [valueB, setValueB] = React.useState('Error state...');
  return (
    <React.Fragment>
      <Textarea
        positive
        value={valueA}
        onChange={(e) => setValueA(e.currentTarget.value)}
        placeholder="Positive state..."
      />
      <br />
      <Textarea
        error
        value={valueB}
        onChange={(e) => setValueB(e.currentTarget.value)}
        placeholder="Error state..."
      />
      <br />
      <Textarea disabled value="Disabled state..." />
      <br />
      <Textarea readOnly value="ReadOnly state..." />
    </React.Fragment>
  );
}

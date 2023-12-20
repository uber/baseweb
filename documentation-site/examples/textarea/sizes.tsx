import * as React from 'react';
import {Textarea} from 'baseui/textarea';
import {SIZE} from 'baseui/input';

export default function Example() {
  const [valueA, setValueA] = React.useState('Compact size...');
  const [valueB, setValueB] = React.useState('Default size...');
  const [valueC, setValueC] = React.useState('Large size...');
  return (
    <React.Fragment>
      <Textarea
        size={SIZE.compact}
        value={valueA}
        onChange={(e) => setValueA(e.currentTarget.value)}
        placeholder="Compact size..."
      />
      <br />
      <Textarea
        value={valueB}
        onChange={(e) => setValueB(e.currentTarget.value)}
        placeholder="Default size..."
      />
      <br />
      <Textarea
        size={SIZE.large}
        value={valueC}
        onChange={(e) => setValueC(e.currentTarget.value)}
        placeholder="Large size..."
      />
    </React.Fragment>
  );
}

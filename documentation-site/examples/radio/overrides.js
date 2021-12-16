// @flow
import * as React from 'react';
import {Paragraph3} from 'baseui/typography';
import {Radio, RadioGroup, type RadioOverrides} from 'baseui/radio';

export default function Example() {
  const [value, setValue] = React.useState('1');
  const radioOverrides: RadioOverrides = {
    Label: ({$value}) => (
      <Paragraph3>Custom label for value: {$value}</Paragraph3>
    ),
    RadioMarkOuter: {
      style: ({$theme}) => ({
        backgroundColor: $theme.colors.positive,
      }),
    },
  };
  return (
    <RadioGroup
      name="overrides"
      onChange={e => setValue(e.target.value)}
      value={value}
    >
      <Radio overrides={radioOverrides} value="1">
        First
      </Radio>
      <Radio overrides={radioOverrides} value="2">
        Second
      </Radio>
      <Radio overrides={radioOverrides} value="3">
        Third
      </Radio>
    </RadioGroup>
  );
}

// @flow
import * as React from 'react';
import {ParagraphSmall} from 'baseui/typography';
import {
  Radio,
  RadioGroup,
  type RadioOverridesT,
} from 'baseui/radio';

export default function Example() {
  const [value, setValue] = React.useState('1');
  const radioOverrides: RadioOverridesT = {
    Label: ({$value}) => (
      <ParagraphSmall>
        Custom label for value: {$value}
      </ParagraphSmall>
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

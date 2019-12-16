import * as React from 'react';
import {Paragraph3} from 'baseui/typography';
import {Radio, RadioGroup} from 'baseui/radio';

export default () => {
  const [value, setValue] = React.useState('1');
  return (
    <RadioGroup
      name="radio group"
      onChange={e => setValue(e.target.value)}
      value={value}
    >
      <Radio
        overrides={{
          Label: ({$value}) => (
            <Paragraph3>
              Custom label for value: {$value}
            </Paragraph3>
          ),
          RadioMarkOuter: {
            style: ({$theme}) => ({
              backgroundColor: $theme.colors.positive,
            }),
          },
        }}
        value="1"
      >
        First
      </Radio>
      <Radio
        overrides={{
          Label: ({$value}) => (
            <Paragraph3>
              Custom label for value: {$value}
            </Paragraph3>
          ),
          RadioMarkOuter: {
            style: ({$theme}) => ({
              backgroundColor: $theme.colors.positive,
            }),
          },
        }}
        value="2"
      >
        Second
      </Radio>
      <Radio
        overrides={{
          Label: ({$value}) => (
            <Paragraph3>
              Custom label for value: {$value}
            </Paragraph3>
          ),
          RadioMarkOuter: {
            style: ({$theme}) => ({
              backgroundColor: $theme.colors.positive,
            }),
          },
        }}
        value="3"
      >
        Third
      </Radio>
    </RadioGroup>
  );
};

// @flow
import * as React from 'react';
import {Datepicker} from 'baseui/datepicker';
import {LabelSmall, ParagraphSmall} from 'baseui/typography';

export default () => {
  const [value, setValue] = React.useState(null);
  return (
    <React.Fragment>
      <Datepicker
        value={value}
        onChange={({date}) => {
          if (Array.isArray(date)) {
            throw TypeError(`Invalid date`);
          }
          setValue(date);
        }}
        overrides={{
          Input: {
            props: {
              clearable: true,
              overrides: {
                Input: {
                  props: {
                    onChange: ({
                      target: {value},
                    }: SyntheticInputEvent<HTMLInputElement>): void => {
                      if (!value) {
                        setValue(null);
                      }
                    },
                  },
                },
              },
            },
          },
        }}
      />
      <br />
      <LabelSmall>Selected date</LabelSmall>
      <ParagraphSmall>
        {value ? value.toDateString() : 'No date selected'}
      </ParagraphSmall>
    </React.Fragment>
  );
};
